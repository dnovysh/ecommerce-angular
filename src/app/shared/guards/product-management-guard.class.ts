import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { map } from "rxjs";

import { AppStateInterface } from "src/app/shared/types/app-state.interface";
import { authoritiesSelector } from "src/app/shared/modules/identity/store/selectors";


// noinspection JSIgnoredPromiseFromCall
@Injectable()
export class ProductManagementGuard implements CanActivate {

  constructor(private store: Store<AppStateInterface>,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.pipe(select(authoritiesSelector), map((authorities: Set<string>) => {
      if (authorities.has('product.read') || authorities.has('dealer.product.read')) {
        return true
      }
      this.router.navigateByUrl('forbidden')
      return false
    }))
  }
}
