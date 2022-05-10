import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "src/app/auth/store/action.types";
import { UserDetailsInterface } from "src/app/shared/modules/identity/types/user-details.interface";
import { ApiErrorInterface } from "src/app/shared/types/error/api-error.interface";
import { SignInRequestInterface } from "src/app/auth/types/sign-in-request.interface";


export const signInAction = createAction(
  ActionTypes.SIGN_IN,
  props<{
    signInRequest: SignInRequestInterface,
    returnUrl: string
  }>()
)

export const signInSuccessAction = createAction(
  ActionTypes.SIGN_IN_SUCCESS,
  props<{
    userDetails: UserDetailsInterface,
    returnUrl: string
  }>()
)

export const signInFailureAction = createAction(
  ActionTypes.SIGN_IN_FAILURE,
  props<{ error: ApiErrorInterface | null }>()
)
