import { Action, createReducer, on } from "@ngrx/store";

import { IdentityStateInterface } from "src/app/shared/modules/identity/types/identity-state.interface";
import {
  getUserDetailsAction, getUserDetailsFailureAction,
  getUserDetailsSuccessAction
} from "src/app/shared/modules/identity/store/actions/get-user-details.action";


const initialState: IdentityStateInterface = {
  isLoggedIn: null,
  userDetailsIsLoading: false,
  userDetails: null
}

export const reducer = createReducer<IdentityStateInterface, Action>(
  initialState,
  on(getUserDetailsAction, (state): IdentityStateInterface => ({
    ...state,
    userDetailsIsLoading: true
  })),
  on(getUserDetailsSuccessAction, (state, action): IdentityStateInterface => ({
    ...state,
    userDetailsIsLoading: false,
    isLoggedIn: true,
    userDetails: action.userDetails
  })),
  on(getUserDetailsFailureAction, (state): IdentityStateInterface => ({
    ...state,
    userDetailsIsLoading: false,
    isLoggedIn: false
  }))
)
