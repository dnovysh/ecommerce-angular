import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";

import { AppStateInterface } from "src/app/shared/types/app-state.interface";
import { authoritiesSelector, isLoadingSelector } from "src/app/admin/authority-grouping-report/store/selectors";
import { getAuthoritiesAction } from "src/app/admin/authority-grouping-report/store/get-authorities.action";
import {
  AuthorityWithGroupingFieldInterface
} from "src/app/admin/authority-grouping-report/types/authority-with-grouping-field.interface";


@Component({
  selector: 'ec-authority-grouping-report',
  templateUrl: './authority-grouping-report.component.html',
  styleUrls: ['./authority-grouping-report.component.scss']
})
export class AuthorityGroupingReportComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>
  authoritiesSubscription: Subscription

  authorities: AuthorityWithGroupingFieldInterface[] | null

  constructor(private store: Store<AppStateInterface>) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.authoritiesSubscription = this.store.pipe(select(authoritiesSelector))
      .subscribe((authorities) => {
        this.authorities = authorities
      })
    this.store.dispatch(getAuthoritiesAction())
  }

  ngOnDestroy(): void {
    this.authoritiesSubscription.unsubscribe()
  }
}
