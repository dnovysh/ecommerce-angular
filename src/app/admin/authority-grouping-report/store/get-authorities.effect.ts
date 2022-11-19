import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { AuthorityService } from "src/app/admin/authority-grouping-report/services/authority.service";
import {
  getAuthoritiesAction,
  getAuthoritiesFailureAction,
  getAuthoritiesSuccessAction
} from "src/app/admin/authority-grouping-report/store/get-authorities.action";
import { AuthorityInterface } from "src/app/admin/authority-grouping-report/types/authority.interface";
import { HttpErrorResponse } from "@angular/common/http";


@Injectable()
export class GetAuthoritiesEffect {
  constructor(private actions$: Actions,
              private authorityService: AuthorityService) {
  }

  getAuthorities$ = createEffect(() => this.actions$.pipe(
    ofType(getAuthoritiesAction),
    switchMap(() => {
      return this.authorityService.getAllAuthorities().pipe(
        map((authorities: AuthorityInterface[]) =>
          getAuthoritiesSuccessAction({ authorities })
        ),
        catchError((errorResponse: HttpErrorResponse) =>
          of(getAuthoritiesFailureAction({ error: errorResponse.error })))
      )
    })
  ))
}
