import request from 'request';
import cheerio from 'cheerio';
import Vid from './models/Vid';
import 'babel-polyfill';

class Crawler {
    crawl() {
        var home = 'https://www.pinkbike.com/news/videos/';
        this.getNewsUrls(home);
    }

    getNewsUrls(home) {
        var crawler = this;
        request(home, function (error, response, html) {
            if (!error) {
                var $ = cheerio.load(html);
                var newsUrls = [];
                $('a[class="f22 fgrey4 bold"]').each(function (index, element) {
                    newsUrls.push($(element).attr('href'));
                });
                console.log('Pages returned from /news/videos:');
                console.log(newsUrls);
                crawler.getVidUrls(newsUrls);
            } else {
                return response.toJSON();
            }
        });
    }

    getVidUrls(newsUrls) {
        newsUrls.forEach((newsUrl) => {
            request(newsUrl, function (error, response, html) {
                if (!error) {
                    var $ = cheerio.load(html);
                    var vidUrls = [];
                    $('iframe[src*="youtube.com"]').each(function (index, element) {
                        vidUrls.push($(element).attr('src'));
                    });
                    console.log(vidUrls);
                } else {
                    return response.toJSON();
                }
            });
        });
    }
}

export default Crawler;