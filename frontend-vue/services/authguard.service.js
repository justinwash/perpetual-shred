import { AuthenticationService } from './authentication.service';

export default class AuthGuardService {
	auth = new AuthenticationService();

	canActivate() {
		if (!this.auth.isLoggedIn()) {
			window.location.replace('/login');
			return false;
		}
		return true;
	}
}
