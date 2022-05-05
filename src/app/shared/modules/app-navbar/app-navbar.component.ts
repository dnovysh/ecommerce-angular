import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { select, Store } from "@ngrx/store";

import { UserDetailsInterface } from "src/app/shared/modules/identity/types/user-details.interface";
import {
  isAuthenticatedSelector,
  isGuestSelector,
  userDetailsSelector
} from "src/app/shared/modules/identity/store/selectors";
import { AppStateInterface } from "src/app/shared/types/app-state.interface";


// noinspection JSIgnoredPromiseFromCall
@Component({
  selector: 'ec-app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss']
})
export class AppNavbarComponent implements OnInit {
  isGuest$: Observable<boolean>
  isAuthenticated$: Observable<boolean>
  userDetails$: Observable<UserDetailsInterface | null>

  searchText: string | null

  constructor(private router: Router, private store: Store<AppStateInterface>) { }

  ngOnInit(): void {
    this.isGuest$ = this.store.pipe(select(isGuestSelector))
    this.isAuthenticated$ = this.store.pipe(select(isAuthenticatedSelector))
    this.userDetails$ = this.store.pipe(select(userDetailsSelector))
  }

  onSearchEnter(): void {
    if (this.searchText) {
      this.router.navigate(['products/search'], { queryParams: { name: this.searchText } })
    }
  }
}
