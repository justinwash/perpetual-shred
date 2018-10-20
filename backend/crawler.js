import request from 'request';
import cheerio from 'cheerio';
import Vid from './models/Vid';
import 'babel-polyfill';

class PinkBikeCrawler {
    async crawl() {
        var home = 'https://www.pinkbike.com/news/videos/';
        var newsUrls = await this.getNewsUrls(home);
        console.log(newsUrls);
        var vidUrls = await this.compileVids(newsUrls);
        console.log(vidUrls);
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

    compileVids(newsUrls) {
        var crawler = this;
        return new Promise(async function (resolve) {
            var allVids = [];
            var vidsByPage = await Promise.all(newsUrls.map(await crawler.getVidInfo));
            for (const group of vidsByPage) {
                allVids = allVids.concat(group);
            }
            resolve(allVids);
        });

    }

    getVidInfo(newsUrl) {
        return new Promise(function (resolve) {
            request(newsUrl, function (error, response, html) {
                if (!error) {
                    var $ = cheerio.load(html);
                    var vids = [];
                    $('iframe[src*="youtube.com"]').each(function (index, element) {
                        var vid = new Vid({
                            url: $(element).attr('src'),
                            origin: newsUrl
                        });
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
}

export default PinkBikeCrawler;