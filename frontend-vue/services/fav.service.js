import { AuthenticationService } from '.authentication.service';
import axios from 'axios';

export default class FavService {
	uri = 'http://localhost:4000';
	auth = new AuthenticationService();

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
