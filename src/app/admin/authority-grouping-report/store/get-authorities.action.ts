import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "src/app/admin/authority-grouping-report/store/action.types";
import {
  AuthorityWithGroupingFieldInterface
} from "src/app/admin/authority-grouping-report/types/authority-with-grouping-field.interface";


export const getAuthoritiesAction = createAction(
  ActionTypes.GET_AUTHORITIES
)

export const getAuthoritiesSuccessAction = createAction(
  ActionTypes.GET_AUTHORITIES_SUCCESS,
  props<{ authorities: AuthorityWithGroupingFieldInterface[] }>()
)

export const getAuthoritiesFailureAction = createAction(
  ActionTypes.GET_AUTHORITIES_FAILURE
)
