import express from 'express';
import jwt from 'express-jwt';
import { userSecret } from '../config/login';
import ProfileController from '../controllers/profile';
import AuthenticationController from '../controllers/authentication';

const userRouter = express.Router();
const auth = jwt({
	secret: userSecret,
	userProperty: 'payload'
})

userRouter.get('/profile', auth, ProfileController.profileRead);
userRouter.post('/login', AuthenticationController.login);
userRouter.post('/register', AuthenticationController.register);
userRouter.get('/isAdmin', AuthenticationController.isAdmin);

export default userRouter;