import { createAction } from "@ngrx/store";
import { ActionTypes } from "src/app/auth/store/action.types";


export const signOutAction = createAction(
  ActionTypes.SIGN_OUT
)
