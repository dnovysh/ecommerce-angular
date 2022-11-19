import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "src/app/auth/store/action.types";
import { UserDetailsInterface } from "src/app/shared/modules/identity/types/user-details.interface";
import { ApiErrorInterface } from "src/app/shared/types/error/api-error.interface";
import { SignUpRequestInterface } from "src/app/auth/types/sign-up-request.interface";

export const signUpAction = createAction(
  ActionTypes.SIGN_UP,
  props<{
    signUpRequest: SignUpRequestInterface,
    returnUrl: string
  }>()
)

export const signUpSuccessAction = createAction(
  ActionTypes.SIGN_UP_SUCCESS,
  props<{
    userDetails: UserDetailsInterface,
    returnUrl: string
  }>()
)

export const signUpFailureAction = createAction(
  ActionTypes.SIGN_UP_FAILURE,
  props<{ error: ApiErrorInterface | null }>()
)

export const signUpRouterNavigationAction = createAction(
  ActionTypes.SIGN_UP_ROUTER_NAVIGATION
)
