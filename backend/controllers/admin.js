import passport from 'passport';
import User from '../models/User';
import mongoose from 'mongoose';

const AdminController = {};

AdminController.authenticate = function (req, res) {
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

export default AdminController