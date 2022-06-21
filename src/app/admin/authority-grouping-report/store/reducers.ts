import { Action, createReducer, on } from "@ngrx/store";
import { AuthorityStateInterface } from "src/app/admin/authority-grouping-report/types/authority-state.interface";
import {
  getAuthoritiesAction,
  getAuthoritiesFailureAction,
  getAuthoritiesSuccessAction
} from "src/app/admin/authority-grouping-report/store/get-authorities.action";

const initialState: AuthorityStateInterface = {
  isLoading: false,
  error: null,
  data: null
}

export const reducer = createReducer<AuthorityStateInterface, Action>(
  initialState,
  on(getAuthoritiesAction, (state): AuthorityStateInterface => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(getAuthoritiesSuccessAction, (state, action): AuthorityStateInterface => ({
    ...state,
    isLoading: false,
    data: action.authorities
  })),
  on(getAuthoritiesFailureAction, (state): AuthorityStateInterface => ({
    ...state,
    isLoading: false
  }))
)
