export default class VidService {
	constructor () {
		this.uri = 'http://localhost:4000';
	}

	getVids() {
		return axios.get(`${this.uri}/vids`);
	}

	getVidById(id) {
		return axios.get(`${this.uri}/vids/${id}`);
	}

	addVid(title, description, origin, releaseDate, url) {
		const vid = {
			title: title,
			description: description,
			origin: origin,
			releaseDate: releaseDate,
			url: url
		};
		return axios.post(`${this.uri}/vids/add`, vid);
	}

	updateVid(id, title, description, origin, releaseDate, url) {
		const vid = {
			title: title,
			description: description,
			origin: origin,
			releaseDate: releaseDate,
			url: url
		};
		return axios.post(`${this.uri}/vids/update/${id}`, vid);
	}

	deleteVid(id) {
		return axios.get(`${this.uri}/vids/delete/${id}`);
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
