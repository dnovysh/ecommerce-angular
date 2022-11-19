import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "src/app/shared/modules/identity/store/action.types";
import { UserDetailsInterface } from "src/app/shared/modules/identity/types/user-details.interface";

export const refreshUserDetailsAction = createAction(
  ActionTypes.REFRESH_USER_DETAILS
)

export const refreshUserDetailsSuccessAction = createAction(
  ActionTypes.REFRESH_USER_DETAILS_SUCCESS,
  props<{ userDetails: UserDetailsInterface }>()
)

export const refreshUserDetailsFailureAction = createAction(
  ActionTypes.REFRESH_USER_DETAILS_FAILURE
)
