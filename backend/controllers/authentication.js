import passport from 'passport';
import User from '../models/User';
import mongoose from 'mongoose';

const AuthenticationController = {};

AuthenticationController.register = function (req, res) {
	User.findOne({ email: req.body.email.toLowerCase() }).then(user => {
		console.log(user);
		if (!user) {
			var user = new User();

			user.name = req.body.name;
			user.email = req.body.email.toLowerCase()
			user.role = 1;
			user.setPassword(req.body.password);

			user.save(function (err) {
				var token;
				token = user.generateJwt();
				res.status(200);
				res.json({
					"token": token
				});
			});
		}
		else {
			res.status(403);
			res.json({
				"error": user
			});
		}
	}).catch(err => {
		res.status(403);
		res.json({ "error": err });
		console.log(err);
	});
};

AuthenticationController.login = function (req, res) {
	passport.authenticate('local', function (err, user, info) {
		var token;
		console.log(req);
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

export default AuthenticationController

