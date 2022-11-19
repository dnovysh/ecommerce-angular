import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";

import { UserDetailsService } from "src/app/shared/modules/identity/services/user-details.service";
import {
  refreshUserDetailsAction,
  refreshUserDetailsFailureAction,
  refreshUserDetailsSuccessAction
} from "src/app/shared/modules/identity/store/actions/refresh-user-details.action";
import { UserDetailsInterface } from "src/app/shared/modules/identity/types/user-details.interface";


@Injectable()
export class RefreshUserDetailsEffect {
  constructor(private actions$: Actions,
              private userDetailsService: UserDetailsService) {
  }

  refreshUserDetails$ = createEffect(() => this.actions$.pipe(
    ofType(refreshUserDetailsAction),
    switchMap(() => {
      return this.userDetailsService.refreshUserDetails().pipe(
        map((userDetails: UserDetailsInterface | null) => {
          if (userDetails === null) {
            return refreshUserDetailsFailureAction()
          }
          return refreshUserDetailsSuccessAction({ userDetails })
        }),
        catchError(() => of(refreshUserDetailsFailureAction()))
      )
    })
  ))
}
