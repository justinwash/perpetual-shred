import { appDb } from '../config/mongoose';
import mongoose from 'mongoose';

let Vid = appDb.model('Vid', new mongoose.Schema({
	title: {
		type: String
	},
	description: {
	},
	origin: {
		type: String
	},
	releaseDate: {
		type: String
	},
	url: {
		type: String
	}
}));

export default appDb.model('Vid', Vid.schema);