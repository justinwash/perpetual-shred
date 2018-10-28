import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent {
	credentials: TokenPayload = {
		email: '',
		name: '',
		password: ''
	};

	constructor(private auth: AuthenticationService, private router: Router) { }

	register() {
		this.auth.register(this.credentials).subscribe(() => {
			//TODO route to profile page, create dat
			this.router.navigateByUrl('/');
		}, (err) => {
			console.error(err);
		});
	}
}
