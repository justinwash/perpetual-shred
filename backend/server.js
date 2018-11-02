import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import passport from 'passport';
import './models/User';
import './config/passport';

import vidsRouter from './routes/vids';
import crawlRouter from './routes/crawl';
import userRouter from './routes/user';
import adminRouter from './routes/admin';

import { appDb, userDb } from './config/mongoose';

const app = express();

app.use(cors());
app.use(bodyParser.json());

appDb.once('open', () => {
	console.log('Application database connection established successfully!');
});

userDb.once('open', () => {
	console.log('User database connection established successfully!');
});

app.use(passport.initialize());
app.use('/vids', vidsRouter);
app.use('/crawl', crawlRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);

app.listen(4000, () => console.log('Express server running on port 4000'));