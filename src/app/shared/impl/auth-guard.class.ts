import { Injectable } from "@angular/core";
import { filter, map, Observable } from "rxjs";
import { select, Store } from "@ngrx/store";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { SignInRouteQueryParamsInterface } from "src/app/auth/types/sign-in-route-query-params.interface";
import { isLoggedInSelector } from "src/app/shared/modules/identity/store/selectors";
import { AppStateInterface } from "src/app/shared/types/app-state.interface";

// noinspection JSIgnoredPromiseFromCall
@Injectable()
export class AuthGuard implements CanActivate {

  isLoggedIn$: Observable<boolean | null>

  constructor(private store: Store<AppStateInterface>,
              private router: Router) {
    this.isLoggedIn$ = this.store.pipe(
      select(isLoggedInSelector),
      filter((isLoggedIn) => isLoggedIn !== null)
    )
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.isLoggedIn$.pipe(map((isLoggedIn) => {
      if (isLoggedIn) {
        return true
      }
      const queryParams: SignInRouteQueryParamsInterface = {
        guardRedirect: true,
        returnUrl: state.url
      }
      this.router.navigate(['login'], { queryParams });
      return false;
    }))
  }
}
