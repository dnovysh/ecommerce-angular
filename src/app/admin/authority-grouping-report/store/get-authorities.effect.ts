import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { AuthorityService } from "src/app/admin/authority-grouping-report/services/authority.service";
import {
  getAuthoritiesAction,
  getAuthoritiesFailureAction,
  getAuthoritiesSuccessAction
} from "src/app/admin/authority-grouping-report/store/get-authorities.action";
import {
  AuthorityWithGroupingFieldInterface
} from "src/app/admin/authority-grouping-report/types/authority-with-grouping-field.interface";


@Injectable()
export class GetCategoriesEffect {
  constructor(private actions$: Actions,
              private authorityService: AuthorityService) {
  }

  getAuthorities$ = createEffect(() => this.actions$.pipe(
    ofType(getAuthoritiesAction),
    switchMap(() => {
      return this.authorityService.getAllAuthoritiesWithGroupingField().pipe(
        map((authorities: AuthorityWithGroupingFieldInterface[]) =>
          getAuthoritiesSuccessAction({ authorities })
        ),
        catchError(() => of(getAuthoritiesFailureAction()))
      )
    })
  ))
}
