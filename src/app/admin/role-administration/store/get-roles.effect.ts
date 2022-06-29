import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { RoleService } from "src/app/admin/role-administration/services/role.service";
import {
  getRolesAction,
  getRolesFailureAction,
  getRolesSuccessAction
} from "src/app/admin/role-administration/store/get-roles.action";
import { RoleInterface } from "src/app/admin/role-administration/types/role.interface";


@Injectable()
export class GetRolesEffect {
  constructor(private actions$: Actions,
              private roleService: RoleService) {
  }

  getRoles$ = createEffect(() => this.actions$.pipe(
    ofType(getRolesAction),
    switchMap(() => {
      return this.roleService.getAllRoles().pipe(
        map((roles: RoleInterface[]) =>
          getRolesSuccessAction({ roles })
        ),
        catchError((errorResponse: HttpErrorResponse) =>
          of(getRolesFailureAction({ error: errorResponse.error })))
      )
    })
  ))
}
