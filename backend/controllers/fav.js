import { userDb } from '../config/mongoose';
var User = userDb.model('User');

const FavController = {};

FavController.save = function (req, res) {
	User.findById(req.body.userId)
		.exec(function (err, user) {
			user.favs.push(req.body.vid)
			user.save();
			res.status(200).json(user);
		});
};

FavController.check = function (req, res) {
	User.findById(req.body.userId)
		.exec(function (err, user) {
			var favs = user.favs;
			if (favs.find(x => x._id === req.body.vid._id) !== undefined) {
				console.log(true)
				res.status(200).json(true);
			}
			else {
				res.status(200).json(false);
				console.log(false)
			}
		});
};

export default FavController;