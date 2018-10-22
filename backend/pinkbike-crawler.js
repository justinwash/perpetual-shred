import request from 'request';
import cheerio from 'cheerio';
import Vid from './models/Vid';
import tempVid from './models/tempVid';
import YoutubeService from './services/youtube'
import 'babel-polyfill';

const _yt = new YoutubeService();
class PinkBikeCrawler {
    async crawl() {
        var home = 'https://www.pinkbike.com/news/videos/';
        var newsUrls = await this.getNewsUrls(home);
        var vids = await this.compileYoutubeVids(newsUrls);
        vids = await this.populateYoutubeInfo(vids);
        console.log(vids);
    }

    getNewsUrls(url) {
        return new Promise(function (resolve) {
            request(url, function (error, response, html) {
                if (!error) {
                    var $ = cheerio.load(html);
                    var newsUrls = [];
                    $('a[class="f22 fgrey4 bold"]').each(function (index, element) {
                        newsUrls.push($(element).attr('href'));
                    });
                    resolve(newsUrls);
                }
                else {
                    console.log(response);
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
            if (info.description.length > 400)
                info.description = info.description.substring(0, 400) + '...';

            vid.description = info.description;
            vid.title = info.title;
            vid.releaseDate = info.publishedAt.substring(0, 10);
        }
        return vids;
    }
}


export default PinkBikeCrawler;