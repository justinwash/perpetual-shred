import AuthenticationService from './authentication.service.js';

export default class AdminGuardService {
	constructor() {
		this.uri = 'http://localhost:4000';
		this.auth = new AuthenticationService();
	}

	canActivate() {
		const token = this.auth.getToken();
		if (token !== null) {
			axios.get(`${this.uri}/admin/authenticate`, { headers: { Authorization: `Bearer ${token}` } }).then(res => {
				if (res) return res.data;
			})
		} else {
			return false;
		}
	}
}