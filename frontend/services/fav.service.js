export default class FavService {
	constructor () {
		this.uri = PS._apiUrl;
	}

	saveFav(vid) {
		if (PS._authenticationService.isLoggedIn()) {
			const user = PS._authenticationService.getUserDetails();
			return axios.post(`${this.uri}/user/favs/save`, { userId: user._id, vid: vid });
		}
	}

	checkFav(vid) {
		if (PS._authenticationService.isLoggedIn()) {
			const user = PS._authenticationService.getUserDetails();
			return axios.post(`${this.uri}/user/favs/check`, { userId: user._id, vid: vid });
		}
	}

	removeFav(vid) {
		if (PS._authenticationService.isLoggedIn()) {
			const user = PS._authenticationService.getUserDetails();
			return axios.post(`${this.uri}/user/favs/remove`, { userId: user._id, vid: vid });
		}
	}
}
