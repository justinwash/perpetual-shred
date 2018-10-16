import request from 'request';
import cheerio from 'cheerio';
import Vid from './models/Vid';

const crawler = {
    crawl() {
        var url = 'https://www.pinkbike.com/news/videos/';

        request(url, function (error, response, html) {
            if (!error) {
                var $ = cheerio.load(html);
                var links = [];
                $('a[class="f22 fgrey4 bold"]').each(function (index, element) {
                    links.push($(element).attr('href'));
                });
                console.log(links)
            } else {
                return response.toJSON();
            }
        })
    }
}

export default crawler;