import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "src/app/admin/authority-grouping-report/store/action.types";
import { AuthorityInterface } from "src/app/admin/authority-grouping-report/types/authority.interface";
import { ApiErrorInterface } from "src/app/shared/types/error/api-error.interface";


export const getAuthoritiesAction = createAction(
  ActionTypes.GET_AUTHORITIES
)

export const getAuthoritiesSuccessAction = createAction(
  ActionTypes.GET_AUTHORITIES_SUCCESS,
  props<{ authorities: AuthorityInterface[] }>()
)

export const getAuthoritiesFailureAction = createAction(
  ActionTypes.GET_AUTHORITIES_FAILURE,
  props<{ error: ApiErrorInterface }>()
)
