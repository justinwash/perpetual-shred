import { psConnectionString, suConnectionString } from './login';
import mongoose from 'mongoose';

export const appDb = mongoose.createConnection(psConnectionString);
export const userDb = mongoose.createConnection(suConnectionString);