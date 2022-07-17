import { Injectable } from "@angular/core";
import { combineLatest, filter, map, Observable } from "rxjs";
import { select, Store } from "@ngrx/store";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

import { SignInRouteQueryParamsInterface } from "src/app/auth/types/sign-in-route-query-params.interface";
import { isLoadingSelector, isLoggedInSelector } from "src/app/shared/modules/identity/store/selectors";
import { AppStateInterface } from "src/app/shared/types/app-state.interface";
import { refreshUserDetailsAction } from "src/app/shared/modules/identity/store/actions/refresh-user-details.action";


// noinspection JSIgnoredPromiseFromCall
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<AppStateInterface>,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    this.store.dispatch(refreshUserDetailsAction())

    const isLoggedIn$: Observable<boolean | null> = combineLatest([
      this.store.pipe(select(isLoggedInSelector), filter(isLoggedIn => isLoggedIn !== null)),
      this.store.pipe(select(isLoadingSelector), filter(isLoading => isLoading === false))
    ]).pipe(map(([isLoggedIn, isLoading]: [boolean | null, boolean]) => isLoggedIn))

    return isLoggedIn$.pipe(map((isLoggedIn) => {
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
