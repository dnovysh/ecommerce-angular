import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Router } from "@angular/router";
import { catchError, filter, map, of, switchMap, tap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { routerNavigationAction } from "@ngrx/router-store";

import { AuthService } from "src/app/auth/services/auth.service";
import { AuthResponseInterface } from "src/app/auth/types/auth-response.interface";
import { refreshUserDetailsAction } from "src/app/shared/modules/identity/store/actions/refresh-user-details.action";
import {
  signUpAction,
  signUpFailureAction,
  signUpRouterNavigationAction,
  signUpSuccessAction
} from "src/app/auth/store/actions/sign-up.action";
import { UserDetailsMapper } from "src/app/shared/modules/identity/mappers/user-details.mapper";


// noinspection JSIgnoredPromiseFromCall
@Injectable()
export class SignUpEffect {
  constructor(private actions$: Actions,
              private authService: AuthService,
              private router: Router,
              private mapper: UserDetailsMapper) {
  }

  signUp$ = createEffect(() => this.actions$.pipe(
    ofType(signUpAction),
    switchMap(({ signUpRequest, returnUrl }) =>
      this.authService.signUp(signUpRequest).pipe(
        map((authResponse: AuthResponseInterface) => {
          if (authResponse.user === null) {
            return signUpFailureAction({ error: null })
          }
          return signUpSuccessAction({
            userDetails: this.mapper.mapFromUserDetailsDto(authResponse.user),
            returnUrl: returnUrl
          })
        }),
        catchError((errorResponse: HttpErrorResponse) => {
            return of(signUpFailureAction({ error: errorResponse.error }))
          }
        )
      )
    )
  ))

  redirectAfterSuccessfulSignUp$ = createEffect(() => this.actions$.pipe(
      ofType(signUpSuccessAction),
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

  refreshUserDetailsIfSignUpFailureWithRequiredActionRefreshUser$ = createEffect(() => this.actions$.pipe(
    ofType(signUpFailureAction),
    filter(({ error }) => error !== null && error.requiredAction === 'REFRESH_USER'),
    switchMap(() => of(refreshUserDetailsAction()))
  ))

  navigateSignUpRoute$ = createEffect(() => this.actions$.pipe(
    ofType(routerNavigationAction),
    filter(({ payload }) => payload.event.urlAfterRedirects.startsWith('/signup')),
    switchMap(() => of(signUpRouterNavigationAction()))
  ))
}
