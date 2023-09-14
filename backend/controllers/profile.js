import { userDb } from '../config/mongoose';

var User = userDb.model('User');

const ProfileController = {};

ProfileController.profileRead = function (req, res) {
	// If no user ID exists in the JWT return a 401
	if (!req.payload._id) {
		res.status(401).json({
			"message": "UnauthorizedError: private profile"
		});
	} else {
		// Otherwise continue
		User
			.findById(req.payload._id)
			.exec().then(user => {
				res.status(200).json(user);
			}).catch(err => {
				res.status(500).json(err);
			});
	}
};

export default ProfileController;
