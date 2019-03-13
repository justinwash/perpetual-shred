import axios from 'axios';

export default class CrawlerService {
  uri = 'http://localhost:4000';

  crawl() {
    return axios.get(`${this.uri}/crawl`);
  }
}
