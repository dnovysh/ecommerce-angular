import { Injectable } from "@angular/core";
import { filter, map, Observable } from "rxjs";
import { select, Store } from "@ngrx/store";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

import { SignInRouteQueryParamsInterface } from "src/app/auth/types/sign-in-route-query-params.interface";
import { loadingLoggedSliceSelector } from "src/app/shared/modules/identity/store/selectors";
import { AppStateInterface } from "src/app/shared/types/app-state.interface";
import { refreshUserDetailsAction } from "src/app/shared/modules/identity/store/actions/refresh-user-details.action";
import { LoadingLoggedSliceInterface } from "src/app/shared/modules/identity/types/loading-logged-slice.interface";


// noinspection JSIgnoredPromiseFromCall
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<AppStateInterface>,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    this.store.dispatch(refreshUserDetailsAction())

    const isLoggedIn$: Observable<boolean | null> =
      this.store
        .pipe(select(loadingLoggedSliceSelector),
          filter((slice: LoadingLoggedSliceInterface) => !slice.isLoading && slice.isLoggedIn !== null))
        .pipe(map((slice: LoadingLoggedSliceInterface) => slice.isLoggedIn))

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
