import { Action, createReducer, on } from "@ngrx/store";
import { AuthStateInterface } from "src/app/auth/types/auth-state.interface";
import { signInAction, signInFailureAction, signInSuccessAction } from "src/app/auth/store/actions/sign-in.action";

const initialState: AuthStateInterface = {
  isSubmitting: false,
  successfullyCompleted: null,
  error: null
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
    error: action.error
  }))
)