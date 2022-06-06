import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Params, Router } from "@angular/router";
import { filter, Observable, Subscription } from "rxjs";
import { select, Store } from "@ngrx/store";
import {
  isAuthenticatedSelector,
  isGuestSelector,
  userAliasSelector
} from "src/app/shared/modules/identity/store/selectors";
import { AppStateInterface } from "src/app/shared/types/app-state.interface";
import { SignInRouteQueryParamsInterface } from "src/app/auth/types/sign-in-route-query-params.interface";


// noinspection JSIgnoredPromiseFromCall
@Component({
  selector: 'ec-app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss']
})
export class AppNavbarComponent implements OnInit, OnDestroy {
  isGuest$: Observable<boolean>
  isAuthenticated$: Observable<boolean>
  userAlias$: Observable<string>
  navigationEndSubscription: Subscription

  searchText: string | null
  navigationEnd: NavigationEnd
  loginUrl: string = '/login'
  loginQueryParams: Params

  constructor(private router: Router,
              private store: Store<AppStateInterface>) {
    this.subscribeToNavigationEnd()
  }

  ngOnInit(): void {
    this.isGuest$ = this.store.pipe(select(isGuestSelector))
    this.isAuthenticated$ = this.store.pipe(select(isAuthenticatedSelector))
    this.userAlias$ = this.store.pipe(select(userAliasSelector), filter(Boolean))
  }

  ngOnDestroy(): void {
    this.navigationEndSubscription.unsubscribe()
  }

  onEnterSearch(): void {
    if (this.searchText) {
      this.router.navigate(['products/search'], { queryParams: { name: this.searchText } })
    }
  }

  private subscribeToNavigationEnd(): void {
    this.navigationEndSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
          const navigationEndEvent = <NavigationEnd>event
          this.navigationEnd = new NavigationEnd(
            navigationEndEvent.id, navigationEndEvent.url, navigationEndEvent.urlAfterRedirects
          )
          this.setLoginQueryParams(this.navigationEnd.urlAfterRedirects)
        }
      )
  }

  private setLoginQueryParams(returnUrl: string): void {
    if (returnUrl.includes('/login')) {
      return
    }
    const queryParams: SignInRouteQueryParamsInterface = {
      guardRedirect: false,
      returnUrl: returnUrl
    }
    this.loginQueryParams = { ...queryParams }
  }
}
