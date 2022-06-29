import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";

import { AppStateInterface } from "src/app/shared/types/app-state.interface";
import {
  authoritiesSelector,
  errorSelector,
  isLoadingSelector
} from "src/app/admin/authority-grouping-report/store/selectors";
import { getAuthoritiesAction } from "src/app/admin/authority-grouping-report/store/get-authorities.action";
import { AuthorityInterface } from "src/app/admin/authority-grouping-report/types/authority.interface";
import { ApiErrorInterface } from "src/app/shared/types/error/api-error.interface";


@Component({
  selector: 'ec-authority-grouping-report',
  templateUrl: './authority-grouping-report.component.html',
  styleUrls: ['./authority-grouping-report.component.scss']
})
export class AuthorityGroupingReportComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>
  authoritiesSubscription: Subscription
  errorSubscription: Subscription

  authorities: AuthorityInterface[] | null
  error: ApiErrorInterface | null
  accessDenied: boolean
  accessAllowed: boolean

  constructor(private store: Store<AppStateInterface>) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.subscribeAuthorityState()
    this.subscribeErrorState()
    this.store.dispatch(getAuthoritiesAction())
  }

  ngOnDestroy(): void {
    this.authoritiesSubscription.unsubscribe()
    this.errorSubscription.unsubscribe()
  }

  private subscribeAuthorityState(): void {
    this.authoritiesSubscription = this.store.pipe(select(authoritiesSelector))
      .subscribe((authorities) => {
        if (authorities) {
          this.authorities = [...authorities]
          return
        }
        return null
      })
  }

  // noinspection DuplicatedCode
  private subscribeErrorState(): void {
    this.errorSubscription = this.store.pipe(select(errorSelector))
      .subscribe((error) => {
        this.error = error
        this.accessDenied = error !== null && error.status === 403
        this.accessAllowed = !this.accessDenied
      })
  }
}
