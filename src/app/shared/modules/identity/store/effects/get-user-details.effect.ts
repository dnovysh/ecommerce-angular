import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";

import { UserDetailsService } from "src/app/shared/modules/identity/services/user-details.service";
import {
  getUserDetailsAction,
  getUserDetailsFailureAction,
  getUserDetailsSuccessAction
} from "src/app/shared/modules/identity/store/actions/get-user-details.action";
import { UserDetailsInterface } from "src/app/shared/modules/identity/types/user-details.interface";


@Injectable()
export class GetUserDetailsEffect {
  constructor(private actions$: Actions,
              private userDetailsService: UserDetailsService) {
  }

  getUserDetails$ = createEffect(() => this.actions$.pipe(
    ofType(getUserDetailsAction),
    switchMap(() => {
      return this.userDetailsService.refreshUserDetails().pipe(
        map((userDetails: UserDetailsInterface | null) => {
          if (userDetails === null) {
            return getUserDetailsFailureAction()
          }
          return getUserDetailsSuccessAction({ userDetails })
        }),
        catchError(() => of(getUserDetailsFailureAction()))
      )
    })
  ))
}
