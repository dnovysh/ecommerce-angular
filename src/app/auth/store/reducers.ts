import { Action, createReducer, on } from "@ngrx/store";
import { AuthStateInterface } from "src/app/auth/types/auth-state.interface";
import {
  signInAction,
  signInFailureAction,
  signInRouterNavigationAction,
  signInSuccessAction
} from "src/app/auth/store/actions/sign-in.action";
import { signOutAction, signOutFailureAction, signOutSuccessAction } from "src/app/auth/store/actions/sign-out.action";
import {
  signUpAction,
  signUpFailureAction,
  signUpRouterNavigationAction,
  signUpSuccessAction
} from "src/app/auth/store/actions/sign-up.action";


const initialState: AuthStateInterface = {
  isSubmitting: false,
  successfullyCompleted: null,
  apiError: null,
  signOutIsInProgress: false,
  signOutMessage: null
}

export const reducer = createReducer<AuthStateInterface, Action>(
  initialState,
  // signIn
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
  on(signInRouterNavigationAction, (state): AuthStateInterface => ({
    ...state,
    successfullyCompleted: null,
    apiError: null
  })),
  // signUp
  on(signUpAction, (): AuthStateInterface => ({
    ...initialState,
    isSubmitting: true
  })),
  on(signUpSuccessAction, (state): AuthStateInterface => ({
    ...state,
    isSubmitting: false,
    successfullyCompleted: true
  })),
  on(signUpFailureAction, (state, action): AuthStateInterface => ({
    ...state,
    isSubmitting: false,
    successfullyCompleted: false,
    apiError: action.error
  })),
  on(signUpRouterNavigationAction, (state): AuthStateInterface => ({
    ...state,
    successfullyCompleted: null,
    apiError: null
  })),
  // signOut
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
