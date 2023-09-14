import { userDb } from '../config/mongoose';
var User = userDb.model('User');

const FavController = {};

FavController.save = function (req, res) {
	User.findById(req.body.userId)
		.exec().then(user => {
			user.favs.push(req.body.vid)
			user.save();
			res.status(200).json(user);
		}).catch(err => {
			res.status(500).json(err);
		});
};

FavController.remove = function (req, res) {
	User.findById(req.body.userId)
		.exec().then(user => {
			if (user.favs.find(x => x._id === req.body.vid._id)) {
				user.favs.remove(user.favs.find(x => x._id === req.body.vid._id));
				user.save();
				res.status(200).json(true);
			} else {
				res.status(200).json(false);
			}
		}).catch(err => {
			res.status(500).json(err);
		});
};

FavController.check = function (req, res) {
	User.findById(req.body.userId)
		.exec().then(user => {
			var favs = user.favs;
			if (favs.find(x => x._id === req.body.vid._id) !== undefined) {
				res.status(200).json(true);
			}
			else {
				res.status(200).json(false);
			}
		}).catch(err => {
			res.status(500).json(err);
		});
}

export default FavController;