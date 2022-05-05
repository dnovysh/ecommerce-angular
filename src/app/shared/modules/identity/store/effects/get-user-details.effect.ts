import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";

import { UserDetailsService } from "src/app/shared/modules/identity/services/user-details.service";
import { PersistenceService } from "src/app/shared/services/persistence.service";
import {
  getUserDetailsAction,
  getUserDetailsFailureAction,
  getUserDetailsSuccessAction
} from "src/app/shared/modules/identity/store/actions/get-user-details.action";
import { UserDetailsInterface } from "src/app/shared/modules/identity/types/user-details.interface";


@Injectable()
export class GetUserDetailsEffect {
  constructor(private actions$: Actions,
              private userDetailsService: UserDetailsService,
              private persistenceService: PersistenceService) {
  }

  getUserDetails$ = createEffect(() => this.actions$.pipe(
    ofType(getUserDetailsAction),
    switchMap(() => {
      const token = this.persistenceService.get('accessToken')
      if (!token) {
        return of(getUserDetailsFailureAction())
      }
      return this.userDetailsService.getUserDetails().pipe(
        map((userDetails: UserDetailsInterface) =>
          getUserDetailsSuccessAction({ userDetails })
        ),
        catchError(() => of(getUserDetailsFailureAction()))
      )
    })
  ))
}
