import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Router } from "@angular/router";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

import { AuthService } from "src/app/auth/services/auth.service";
import { signInAction, signInFailureAction, signInSuccessAction } from "src/app/auth/store/actions/sign-in.action";
import { AuthResponseInterface } from "src/app/auth/types/auth-response.interface";


// noinspection JSIgnoredPromiseFromCall
@Injectable()
export class SignInEffect {
  constructor(private actions$: Actions,
              private authService: AuthService,
              private router: Router) {
  }

  signIn$ = createEffect(() => this.actions$.pipe(
    ofType(signInAction),
    switchMap(({ signInRequest, returnUrl }) =>
      this.authService.signIn(signInRequest).pipe(
        map((authResponse: AuthResponseInterface) => {
          //ToDo Access token save in cookie
          return signInSuccessAction({
            userDetails: authResponse.userDetails,
            returnUrl: returnUrl
          })
        }),
        catchError((errorResponse: HttpErrorResponse) =>
          of(signInFailureAction({ error: errorResponse.error }))
        )
      )
    )
  ))

  redirectAfterSuccessfulSignIn$ = createEffect(() => this.actions$.pipe(
      ofType(signInSuccessAction),
      tap(({ returnUrl }) => {
        if (returnUrl) {
          this.router.navigateByUrl(returnUrl)
        } else {
          this.router.navigateByUrl('/')
        }
      })
    ),
    { dispatch: false }
  )
}
