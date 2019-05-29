import express from 'express';
import PinkBikeCrawler from '../crawlers/pinkbike.crawler';

const _pbc = new PinkBikeCrawler();

const crawlRouter = express.Router();

crawlRouter.route('/').post(async (req, res) => {
	console.log('endpoint hit!')
	console.log(_pbc)
	res.json(await _pbc.crawl());
});

export default crawlRouter;