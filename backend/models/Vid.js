import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Vid = new Schema({
	title: {
		type: String
	},
	description: {
		type: String
	},
	origin: {
		type: String
	},
	date: {
		type: String
	},
	url: {
		type: String
	}
});

export default mongoose.model('Vid', Vid);