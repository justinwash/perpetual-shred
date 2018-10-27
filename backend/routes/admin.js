import express from 'express';
import jwt from 'express-jwt';
import { userSecret } from '../config/login';
import ProfileController from '../controllers/profile';
import AdminController from '../controllers/admin';

const adminRouter = express.Router();
const auth = jwt({
	secret: userSecret,
	userProperty: 'payload'
})

adminRouter.get('/authenticate', auth, AdminController.authenticate);

export default adminRouter;