import request from 'request';
import cheerio from 'cheerio';
import Vid from '../models/Vid';
import YoutubeService from '../services/youtube.service'

import VidService from '../services/vid.service';

import 'babel-polyfill';

const _yt = new YoutubeService();
const _vs = new VidService();

class PinkBikeCrawler {
	async crawl() {
		console.log('crawling')
		var home = 'https://www.pinkbike.com/news/videos/';
		var newsUrls = await this.getNewsUrls(home);
		var vids = await this.compileYoutubeVids(newsUrls);
		vids = await this.populateYoutubeInfo(vids);
		_vs.addVids(await vids);
		console.log(await vids)
		return await vids;
	}

	getNewsUrls(url) {
		return new Promise(function (resolve) {
			request(url, function (error, response, html) {
				if (!error) {
					var $ = cheerio.load(html);
					console.log($)
					var newsUrls = [];
					$('a[class="f22 fgrey4 bold"]').each(function (index, element) {
						newsUrls.push($(element).attr('href'));
					});
					resolve(newsUrls);
					//console.log(newsUrls)
				}
				else {
					console.log(error);
				}
			});
		});
	}

	compileYoutubeVids(newsUrls) {
		var crawler = this;
		return new Promise(async function (resolve) {
			var allVids = [];
			var vidsByPage = await Promise.all(newsUrls.map(await crawler.getYoutubeVids));
			for (const group of vidsByPage) {
				allVids = allVids.concat(group);
			}
			resolve(allVids);
		});

	}

	getYoutubeVids(newsUrl) {
		return new Promise(function (resolve) {
			request(newsUrl, function (error, response, html) {
				if (!error) {
					var $ = cheerio.load(html);
					var vids = [];
					$('iframe[src*="youtube.com"]').each(function (index, element) {
						var vid = new Vid();
						vid.url = $(element).attr('src')
						vid.origin = newsUrl
						vids.push(vid);
					});
					resolve(vids);
				}
				else {
					console.log(response);
				}
			});
		});
	}

	async populateYoutubeInfo(vids) {
		for (const vid of vids) {
			var info = await _yt.getYoutubeInfo(vid);
			if (info !== null) {
				if (info.description.length > 400)
					info.description = info.description.substring(0, 400) + '...';

				vid.description = info.description;
				vid.title = info.title;
				vid.releaseDate = info.publishedAt.substring(0, 10);
			}
		}
		return vids;
	}

}


export default PinkBikeCrawler;