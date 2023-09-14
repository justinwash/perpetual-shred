import User from '../models/User';

const AdminController = {};

AdminController.authenticate = function (req, res) {
	// If no user ID exists in the JWT return a 401
	res.status(200).json(true);
	console.log(req)
	if (!req.payload._id) {
		res.status(401).json({
			"message": "No user data. Please log in"
		});
	} else {
		// Otherwise continue
		User
			.findById(req.payload._id)
			.exec().then(user => {
				if (user.role === 0)
					res.status(200).json(true);
				else res.status(200).json(false)
			}).catch(err => {
				res.status(500).json(err);
			});
	}
};

export default AdminController