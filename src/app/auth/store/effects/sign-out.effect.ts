import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "src/app/auth/services/auth.service";
import { Router } from "@angular/router";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { signOutAction, signOutFailureAction, signOutSuccessAction } from "src/app/auth/store/actions/sign-out.action";
import { SignOutResponseInterface } from "src/app/auth/types/sign-out-response.interface";

@Injectable()
export class SignOutEffect {
  constructor(private actions$: Actions,
              private authService: AuthService,
              private router: Router) {
  }

  signOut$ = createEffect(() => this.actions$.pipe(
    ofType(signOutAction),
    switchMap(() =>
      this.authService.signOut().pipe(
        map((response: SignOutResponseInterface) => {
          return signOutSuccessAction({ message: response.message })
        }),
        catchError(() => of(signOutFailureAction()))
      )
    )
  ))

  redirectAfterSuccessfulSignOut$ = createEffect(() => this.actions$.pipe(
      ofType(signOutSuccessAction),
      tap(() => {
        // noinspection JSIgnoredPromiseFromCall
        this.router.navigateByUrl('/')
      })
    ),
    { dispatch: false }
  )
}
