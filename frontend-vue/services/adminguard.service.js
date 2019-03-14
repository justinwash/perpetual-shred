import { AuthenticationService } from './authentication.service';
import axios from 'axios';


export default class AdminGuardService {
	uri = 'http://localhost:4000';
	auth = new AuthenticationService();

	async canActivate() {
		const token = this.auth.getToken();
		if (token !== null) {
			const isAdmin = await axios.get(`${this.uri}/admin/authenticate`, { headers: { Authorization: `Bearer ${token}` } });
			if (isAdmin.data === true) {
				return isAdmin.data;
			} else {
				this.router.navigateByUrl('/login');
				return isAdmin.data;
			}
		} else {
			this.router.navigateByUrl('/login');
			return false;
		}
	}
}
