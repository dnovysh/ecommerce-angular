import { Action, createReducer, on } from "@ngrx/store";

import { IdentityStateInterface } from "src/app/shared/modules/identity/types/identity-state.interface";
import {
  refreshUserDetailsAction,
  refreshUserDetailsFailureAction,
  refreshUserDetailsSuccessAction
} from "src/app/shared/modules/identity/store/actions/refresh-user-details.action";
import { signInSuccessAction } from "src/app/auth/store/actions/sign-in.action";
import { signOutSuccessAction } from "src/app/auth/store/actions/sign-out.action";


const initialState: IdentityStateInterface = {
  isLoading: false,
  isLoggedIn: null,
  userDetails: null
}

export const reducer = createReducer<IdentityStateInterface, Action>(
  initialState,
  on(refreshUserDetailsAction, (state): IdentityStateInterface => ({
    ...state,
    isLoading: true
  })),
  on(refreshUserDetailsSuccessAction, (state, action): IdentityStateInterface => ({
    ...state,
    isLoading: false,
    isLoggedIn: true,
    userDetails: action.userDetails
  })),
  on(refreshUserDetailsFailureAction, (state): IdentityStateInterface => ({
    ...state,
    isLoading: false,
    isLoggedIn: false,
    userDetails: null
  })),
  on(signInSuccessAction, (state, action): IdentityStateInterface => ({
    ...state,
    isLoggedIn: true,
    userDetails: action.userDetails
  })),
  on(signOutSuccessAction, (state, action): IdentityStateInterface => ({
    ...state,
    isLoggedIn: false,
    userDetails: null
  }))
)
