import express from 'express';
import Crawler from '../crawlers/pinkbike.crawler';

const _pbc = new Crawler();

const crawlRouter = express.Router();

crawlRouter.route('/').post(async (req, res) => {
	res.json(await _pbc.crawl());
});

export default crawlRouter;