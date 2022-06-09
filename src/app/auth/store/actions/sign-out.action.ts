import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "src/app/auth/store/action.types";


export const signOutAction = createAction(
  ActionTypes.SIGN_OUT
)

export const signOutSuccessAction = createAction(
  ActionTypes.SIGN_OUT_SUCCESS,
  props<{message: string}>()
)

export const signOutFailureAction = createAction(
  ActionTypes.SIGN_OUT_FAILURE
)
