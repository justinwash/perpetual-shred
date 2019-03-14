
import { map } from '../dependencies/rxjs';
import axios from '../dependencies/axios';

export default class AuthenticationService {
	token;
	uri = 'http://localhost:4000';

	request(method /* 'post' | 'get' */, type /* 'login' | 'register' | 'profile' */, user) {
		let base;

		if (method === 'post') {
			base = axios.post(`${this.uri}/user/${type}`, user);
		} else {
			base = axios.get(`${this.uri}/user/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` } });
		}
		const request = base.pipe(
			map((data) => {
				if (data.token) {
					this.saveToken(data.token);
				}
				return data;
			})
		);
		return request;
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
	_id;
	email;
	name;
	role;
	exp;
	iat;
}

export class TokenResponse {
	token;
}

export class TokenPayload {
	email;
	password;
	name;
}

