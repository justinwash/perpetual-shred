export default class FavService {
	constructor () {
		this.uri = 'http://localhost:4000';
		this.auth = PS._authenticationService;
	}

	async saveFav(vid) {
		if (this.auth.isLoggedIn()) {
			const result = await axios.post(`${this.uri}/user/favs/save`, { userId: this.auth.getUserDetails()._id, vid: vid });
			if (result.data === true) {
				return true;
			} else {
				return false;
			}
		}
	}

	async checkFav(vid) {
		if (this.auth.isLoggedIn()) {
			const result = await axios.post(`${this.uri}/user/favs/check`, { userId: this.auth.getUserDetails()._id, vid: vid });
			if (result.data === true) {
				return true;
			} else {
				return false;
			}
		}
	}

	async removeFav(vid) {
		if (this.auth.isLoggedIn()) {
			const result = await axios.post(`${this.uri}/user/favs/remove`, { userId: this.auth.getUserDetails()._id, vid: vid });
			if (result.data === true) {
				return true;
			} else {
				return false;
			}
		}
	}
}
