import request from 'request';
import cheerio from 'cheerio';
import Vid from './models/Vid';

const crawler = {
    crawl() {
        var url = 'https://www.pinkbike.com/news/videos/';

        request(url, function(error, response, html) {
            if (!error) {
                var $ = cheerio.load(html);
                var vids = [];
                console.log(vids)
            } else {
                return response.toJSON();
            }
        })
    }
}

export default crawler;