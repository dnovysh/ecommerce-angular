import { Action, createReducer, on } from "@ngrx/store";

import { IdentityStateInterface } from "src/app/shared/modules/identity/types/identity-state.interface";
import {
  getUserDetailsAction,
  getUserDetailsFailureAction,
  getUserDetailsSuccessAction
} from "src/app/shared/modules/identity/store/actions/get-user-details.action";
import { signInSuccessAction } from "src/app/auth/store/actions/sign-in.action";


const initialState: IdentityStateInterface = {
  isLoading: false,
  isLoggedIn: null,
  userDetails: null
}

export const reducer = createReducer<IdentityStateInterface, Action>(
  initialState,
  on(getUserDetailsAction, (state): IdentityStateInterface => ({
    ...state,
    isLoading: true
  })),
  on(getUserDetailsSuccessAction, (state, action): IdentityStateInterface => ({
    ...state,
    isLoading: false,
    isLoggedIn: true,
    userDetails: action.userDetails
  })),
  on(getUserDetailsFailureAction, (state): IdentityStateInterface => ({
    ...state,
    isLoading: false,
    isLoggedIn: false
  })),
  on(signInSuccessAction, (state, action): IdentityStateInterface => ({
    ...state,
    isLoggedIn: true,
    userDetails: action.userDetails
  }))
)
