export default class CrawlerService {
  constructor () {
    this.uri = 'http://localhost:4000';
  }

  crawl() {
    return axios.get(`${this.uri}/crawl`);
  }
}
