import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { filter, Observable, Subscription } from "rxjs";
import { select, Store } from "@ngrx/store";
import {
  isAuthenticatedSelector,
  isGuestSelector,
  userAliasSelector
} from "src/app/shared/modules/identity/store/selectors";
import { AppStateInterface } from "src/app/shared/types/app-state.interface";


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
  loginUrl: string

  constructor(private router: Router,
              private store: Store<AppStateInterface>) {
    this.loginUrl = '/login'
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

  onClickSignIn() {
    const currentUrl = this.router.routerState.snapshot.url
    if (currentUrl.includes('/login')) {
      this.router.navigateByUrl(currentUrl)
      return
    }

    console.log(this.router.routerState.snapshot)
    console.log(this.router.routerState.snapshot.url)
    this.router.navigate(['login'], {
      queryParams: { returnUrl: this.router.routerState.snapshot.url }
    })
  }

  private subscribeToNavigationEnd(): void {
    this.navigationEndSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        console.log(event)
        }
      )
  }

}
