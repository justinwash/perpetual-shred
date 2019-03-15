import AuthenticationService from './authentication.service.js';

export default class AdminGuardService {
	constructor () {
		this.uri = 'http://localhost:4000';
		this.auth = new AuthenticationService();
	}

	async canActivate() {
		const token = this.auth.getToken();
		if (token !== null) {
			const isAdmin = await axios.get(`${this.uri}/admin/authenticate`, { headers: { Authorization: `Bearer ${token}` } });
			if (isAdmin) return isAdmin.data;
		} else {
			return false;
		}
	}
}

module.exports = AdminGuardService;