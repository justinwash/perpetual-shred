import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AdminGuardService implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router) { }

  canActivate() {
    console.log('checking admin status');
    if (!this.auth.isAdmin()) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}