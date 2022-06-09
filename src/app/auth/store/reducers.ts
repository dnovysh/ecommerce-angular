import { Action, createReducer, on } from "@ngrx/store";
import { AuthStateInterface } from "src/app/auth/types/auth-state.interface";
import { signInAction, signInFailureAction, signInSuccessAction } from "src/app/auth/store/actions/sign-in.action";
import { signOutAction, signOutFailureAction, signOutSuccessAction } from "src/app/auth/store/actions/sign-out.action";

const initialState: AuthStateInterface = {
  isSubmitting: false,
  successfullyCompleted: null,
  apiError: null,
  signOutIsInProgress: false,
  signOutMessage: null
}

export const reducer = createReducer<AuthStateInterface, Action>(
  initialState,
  on(signInAction, (): AuthStateInterface => ({
    ...initialState,
    isSubmitting: true
  })),
  on(signInSuccessAction, (state): AuthStateInterface => ({
    ...state,
    isSubmitting: false,
    successfullyCompleted: true
  })),
  on(signInFailureAction, (state, action): AuthStateInterface => ({
    ...state,
    isSubmitting: false,
    successfullyCompleted: false,
    apiError: action.error
  })),
  on(signOutAction, (state): AuthStateInterface => ({
    ...state,
    signOutIsInProgress: true,
  })),
  on(signOutSuccessAction, (state, action): AuthStateInterface => ({
    ...state,
    signOutIsInProgress: false,
    signOutMessage: action.message
  })),
  on(signOutFailureAction, (state): AuthStateInterface => ({
    ...state,
    signOutIsInProgress: false,
    signOutMessage: null
  }))
)
