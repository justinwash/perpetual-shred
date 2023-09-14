export default class VidService {
	constructor () {
		this.uri = PS._apiUrl;
	}

	getVids() {
		return axios.get(`${this.uri}/vids`);
	}

	getRandomVid() {
		console.log('getRandomVid', `${this.uri}/vids/random`);
		axios.get(`${this.uri}/vids/random`).then(res => {
			return res;
		}).catch(err => { 
			console.log('Error getting random vid: ', err);
			return err;
		});
	}

	getVidById(id) {
		return axios.get(`${this.uri}/vids/${id}`);
	}

	getPlayerType(url) {
		if (url.includes('youtube')) {
			return 'youtube';
		}
		if (url.includes('pinkbike')) {
			return 'pinkbike';
		}
		if (url.includes('vimeo')) {
			return 'vimeo';
		} else { return url; }
	}
}
