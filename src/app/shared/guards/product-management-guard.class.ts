import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { filter, map, Observable } from "rxjs";

import { AppStateInterface } from "src/app/shared/types/app-state.interface";
import { identityStateSelector } from "src/app/shared/modules/identity/store/selectors";
import { refreshUserDetailsAction } from "src/app/shared/modules/identity/store/actions/refresh-user-details.action";
import { IdentityStateInterface } from "src/app/shared/modules/identity/types/identity-state.interface";
import { SignInRouteQueryParamsInterface } from "src/app/auth/types/sign-in-route-query-params.interface";


// noinspection JSIgnoredPromiseFromCall
@Injectable()
export class ProductManagementGuard implements CanActivate {

  constructor(private store: Store<AppStateInterface>,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) {

    this.store.dispatch(refreshUserDetailsAction())

    const identityState$: Observable<IdentityStateInterface> = this.store
      .pipe(select(identityStateSelector), filter(identityState =>
        !identityState.isLoading && identityState.isLoggedIn !== null
      ))

    return identityState$.pipe(map(identityState => {
      if (!identityState.isLoggedIn) {
        const queryParams: SignInRouteQueryParamsInterface = {
          guardRedirect: true,
          returnUrl: routerState.url
        }
        this.router.navigate(['login'], { queryParams })
        return false
      }
      if (identityState.userDetails?.authorities?.has('product.read')) {
        return true
      }
      if (identityState.userDetails?.dealerRepresentative &&
        identityState.userDetails.dealer !== null &&
        identityState.userDetails.authorities.has('dealer.product.read')
      ) {
        return true
      }
      this.router.navigateByUrl('forbidden')
      return false
    }))
  }
}
