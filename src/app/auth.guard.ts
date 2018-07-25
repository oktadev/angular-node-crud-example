import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private oktaAuth: OktaAuthService, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    console.log(route, state);
    if (await this.oktaAuth.isAuthenticated()) {
      return true;
    }

    this.oktaAuth.loginRedirect(state.url);
    return false;
  }
}
