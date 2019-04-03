import express from 'express';
import Vid from '../models/Vid';

const vidsRouter = express.Router();

vidsRouter.route('/').get((req, res) => {
	Vid.find((err, vids) => {
		if (err)
			console.log(err);
		else
			res.json(vids);
	});
});

vidsRouter.route('/random').get((req, res) => {
	Vid.aggregate([{ $sample: { size: 1 } }], (err, vid) => {
		if (err)
			console.log(err);
		else
			res.json(vid);
	});
});

vidsRouter.route('/:id').get((req, res) => {
	Vid.findById(req.params.id, (err, vid) => {
		if (err)
			console.log(err);
		else
			res.json(vid);
	});
});

vidsRouter.route('/add').post((req, res) => {
	let vid = new Vid(req.body);
	vid.save()
		.then(vid => {
			res.status(200).json({ 'vid': 'Added successfully' });
		})
		.catch(err => {
			res.status(400).send('Failed to create new record');
		});
});

vidsRouter.route('/update/:id').post((req, res) => {
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

vidsRouter.route('/delete/:id').get((req, res) => {
	Vid.findByIdAndRemove({ _id: req.params.id }, (err, vid) => {
		if (err)
			res.json(err);
		else
			res.json('Remove successfully');
	});
});

export default vidsRouter;