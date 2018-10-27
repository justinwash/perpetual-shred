import passport from 'passport';
import User from '../models/User';
import mongoose from 'mongoose';

const AuthenticationController = {};

AuthenticationController.register = function (req, res) {
	var user = new User();

	user.name = req.body.name;
	user.email = req.body.email;
	user.role = 0;
	user.setPassword(req.body.password);

	user.save(function (err) {
		var token;
		token = user.generateJwt();
		res.status(200);
		res.json({
			"token": token
		});
	});
};

AuthenticationController.login = function (req, res) {
	passport.authenticate('local', function (err, user, info) {
		var token;

		// If Passport throws/catches an error
		if (err) {
			res.status(404).json(err);
			return;
		}

		// If a user is found
		if (user) {
			token = user.generateJwt();
			res.status(200);
			res.json({
				"token": token
			});
		} else {
			// If user is not found
			res.status(401).json(info);
		}
	})(req, res);
};

AuthenticationController.isAdmin = function (req, res) {
	console.log(req);
	// If no user ID exists in the JWT return a 401
	if (!req.payload._id) {
		res.status(401).json({
			"message": "No user data. Please log in"
		});
	} else {
		// Otherwise continue
		User
			.findById(req.payload._id)
			.exec(function (err, user) {
				if (user.role === 0)
					res.status(200).json(true);
				else res.status(401).json(false)
			});
	}
};

export default AuthenticationController

