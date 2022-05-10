import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "src/app/shared/modules/identity/store/action.types";
import { UserDetailsInterface } from "src/app/shared/modules/identity/types/user-details.interface";

export const getUserDetailsAction = createAction(
  ActionTypes.GET_USER_DETAILS
)

export const getUserDetailsSuccessAction = createAction(
  ActionTypes.GET_USER_DETAILS_SUCCESS,
  props<{ userDetails: UserDetailsInterface }>()
)

export const getUserDetailsFailureAction = createAction(
  ActionTypes.GET_USER_DETAILS_FAILURE
)
