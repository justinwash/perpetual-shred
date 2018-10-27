import express from 'express';
import Crawler from '../crawlers/pinkbike.crawler';

const _pbc = new Crawler();

const crawlRouter = express.Router();

crawlRouter.route('/').get((req, res) => {
	_pbc.crawl();
	res.json('Crawler started')
});

export default crawlRouter;