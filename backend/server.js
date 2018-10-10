import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Vid from './models/Vid';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://dev:dev123@ds125953.mlab.com:25953/perpetualshred');

const connection = mongoose.connection;

connection.once('open', () => {
	console.log('MongoDB database connection established successfully!');
});

router.route('/vids').get((req, res) => {
	Vid.find((err, vids) => {
		if (err)
			console.log(err);
		else
			res.json(vids);
	});
});

router.route('/vids/:id').get((req, res) => {
	Vid.findById(req.params.id, (err, vid) => {
		if (err)
			console.log(err);
		else
			res.json(vid);
	});
});

router.route('/vids/add').post((req, res) => {
	let vid = new Vid(req.body);
	vid.save()
		.then(vid => {
			res.status(200).json({ 'vid': 'Added successfully' });
		})
		.catch(err => {
			res.status(400).send('Failed to create new record');
		});
});

router.route('/vids/update/:id').post((req, res) => {
	Vid.findById(req.params.id, (err, vid) => {
		if (!vid)
			return next(new Error('Could not load document'));
		else {
			vid.title = req.body.title;
			vid.description = req.body.description;
			vid.origin = req.body.origin;
			vid.releaseDate = req.body.releaseDate;
			vid.url = req.body.url;

			vid.save().then(vid => {
				res.json('Update done');
			}).catch(err => {
				res.status(400).send('Update failed');
			});
		}
	});
});

router.route('/vids/delete/:id').get((req, res) => {
	Vid.findByIdAndRemove({ _id: req.params.id }, (err, vid) => {
		if (err)
			res.json(err);
		else
			res.json('Remove successfully');
	})
})

app.use('/', router);

app.listen(4000, () => console.log('Express server running on port 4000'));