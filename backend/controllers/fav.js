import { userDb } from '../config/mongoose';
var User = userDb.model('User');

const FavController = {};

FavController.save = function (req, res) {
	console.log(req.body.vid.title);
	User
		.findById(req.body.userId)
		.exec(function (err, user) {
			user.favs.push(req.body.vid)
			res.status(200).json(user);
		});
};

export default FavController;