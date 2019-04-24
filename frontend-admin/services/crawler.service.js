export default class CrawlerService {
  constructor () {
		this.uri = 'https://www.perpetualshred.com/';
  }

  crawl() {
    return axios.get(`${this.uri}/crawl`);
  }
}
