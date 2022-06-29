import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";

import { AppStateInterface } from "src/app/shared/types/app-state.interface";
import { RoleInterface } from "src/app/admin/role-administration/types/role.interface";
import { errorSelector, isLoadingSelector, rolesSelector } from "src/app/admin/role-administration/store/selectors";
import { getRolesAction } from "src/app/admin/role-administration/store/get-roles.action";
import { ApiErrorInterface } from "src/app/shared/types/error/api-error.interface";


@Component({
  selector: 'ec-role-administration',
  templateUrl: './role-administration.component.html',
  styleUrls: ['./role-administration.component.scss']
})
export class RoleAdministrationComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>
  rolesSubscription: Subscription
  errorSubscription: Subscription

  roles: RoleInterface[] | null
  error: ApiErrorInterface | null
  accessDenied: boolean
  accessAllowed: boolean

  constructor(private store: Store<AppStateInterface>) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.subscribeRoleState()
    this.subscribeErrorState()
    this.store.dispatch(getRolesAction())
  }

  ngOnDestroy(): void {
    this.rolesSubscription.unsubscribe()
    this.errorSubscription.unsubscribe()
  }

  private subscribeRoleState(): void {
    this.rolesSubscription = this.store.pipe(select(rolesSelector))
      .subscribe((roles) => {
        if (roles) {
          const resultRoles = new Array<RoleInterface>()
          roles.forEach((role) => {
            resultRoles.push({
              id: role.id,
              name: role.name,
              authorities: [...role.authorities]
            })
          })
          this.roles = resultRoles
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
