import express from 'express';
import jwt from 'express-jwt';
import { userSecret } from '../config/login';
import ProfileController from '../controllers/profile';
import AuthenticationController from '../controllers/authentication';
import FavController from '../controllers/fav';

const userRouter = express.Router();
const auth = jwt({
	secret: userSecret,
	userProperty: 'payload'
})

userRouter.get('/profile', auth, ProfileController.profileRead);
userRouter.post('/login', AuthenticationController.login);
userRouter.post('/register', AuthenticationController.register);
userRouter.post('/favs/save', FavController.save);

export default userRouter;