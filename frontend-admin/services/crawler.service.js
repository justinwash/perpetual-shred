export default class CrawlerService {
  constructor () {
    this.uri = PS._apiUrl;
  }

  crawl() {
    return axios.get(`${this.uri}/crawl`);
  }
}
