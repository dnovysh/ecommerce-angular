import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { SignInRouteQueryParamsInterface } from "src/app/auth/types/sign-in-route-query-params.interface";

// noinspection JSIgnoredPromiseFromCall
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // ToDo check permissions from user details and return true if access is allowed

    // not logged in so redirect to login page with the return url and return false
    const queryParams: SignInRouteQueryParamsInterface = {
      guardRedirect: true,
      returnUrl: state.url
    }
    this.router.navigate(['login'], { queryParams });
    return false;
  }
}
