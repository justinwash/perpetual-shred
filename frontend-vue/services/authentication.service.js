export default class AuthenticationService {
	constructor() {
		this.token;
		this.uri = 'http://localhost:4000';
	}

	async request(method /* 'post' | 'get' */, type /* 'login' | 'register' | 'profile' */, user) {
		let request;

		if (method === 'post') {
			request = axios.post(`${this.uri}/user/${type}`, user).then(res => {
				if (res.data.token) {
					this.saveToken(res.data.token);
				}
				return res;
			}).catch(err => {
				return err;
			});
			return request;
		} else {
			request = axios.get(`${this.uri}/user/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` } }).then(res => {
				if (res.data.token) {
					this.saveToken(res.data.token);
				}
				return res;
			}).catch(err => {
				return err;
			});
			return request;
		}
	}

	register(user) {
		return this.request('post', 'register', user);
	}

	login(user) {
		return this.request('post', 'login', user);
	}

	profile() {
		return this.request('get', 'profile');
	}

	saveToken(token) {
		localStorage.setItem('mean-token', token);
		this.token = token;
	}

	getToken() {
		if (!this.token) {
			this.token = localStorage.getItem('mean-token');
		}
		return this.token;
	}

	logout() {
		this.token = '';
		window.localStorage.removeItem('mean-token');
		window.location.replace('/');
	}

	getUserDetails() {
		const token = this.getToken();
		if (token) {
			return this.parseJwt(token);
		} else {
			return null;
		}
	}

	isLoggedIn() {
		const user = this.getUserDetails();
		if (user) {
			return user.exp > Date.now() / 1000;
		} else {
			return false;
		}
	}

	parseJwt(token) {
		const base64Url = token.split('.')[1];
		const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		return JSON.parse(window.atob(base64));
	}
}

export class UserDetails {
	constructor() {
		_id;
		email;
		name;
		role;
		exp;
		iat;
	}

}

export class TokenResponse {
	constructor() {
		token;
	}
}

export class TokenPayload {
	constructor() {
		email;
		password;
		name;
	}
}

