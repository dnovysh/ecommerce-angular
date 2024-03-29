import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthStateInterface } from "src/app/auth/types/auth-state.interface";
import { AppStateInterface } from "src/app/shared/types/app-state.interface";
import { ValidationErrorInterface } from "src/app/shared/types/error/validation-error.interface";
import { ApiErrorInterface } from "src/app/shared/types/error/api-error.interface";


export const authFeatureSelector = createFeatureSelector<AuthStateInterface>('auth');

export const isSubmittingSelector = createSelector<AppStateInterface, AuthStateInterface, boolean>(
  authFeatureSelector,
  (state: AuthStateInterface) => state.isSubmitting
)

export const authFormCompletedSelector = createSelector<AppStateInterface, AuthStateInterface, boolean>(
  authFeatureSelector,
  (state: AuthStateInterface) => state.successfullyCompleted === true
)

export const isErrorSelector = createSelector<AppStateInterface, AuthStateInterface, boolean>(
  authFeatureSelector,
  (state: AuthStateInterface) => state.successfullyCompleted === false
)

export const validationErrorsSelector =
  createSelector<AppStateInterface, AuthStateInterface, ValidationErrorInterface[] | null>(
    authFeatureSelector,
    (state: AuthStateInterface) =>
      state.apiError?.errors ? state.apiError.errors : null
  )

export const badRequestWithoutDetailsSelector = createSelector(
  authFeatureSelector,
  (state: AuthStateInterface) => {
    const err = state.apiError
    if (state.successfullyCompleted === false && err && err.status === 400 &&
      (err.errors === undefined || err.errors === null || err.errors.length === 0)) {
      return state.apiError
    }
    return null
  }
)

export const isUnknownErrorSelector = createSelector(
  isErrorSelector,
  validationErrorsSelector,
  badRequestWithoutDetailsSelector,
  (isError: boolean,
   validationErrors: ValidationErrorInterface[] | null,
   badRequestWithoutDetails: ApiErrorInterface | null) =>
    isError && (validationErrors === null || validationErrors.length === 0) && badRequestWithoutDetails === null
)

export const signOutIsInProgressSelector = createSelector<AppStateInterface, AuthStateInterface, boolean>(
  authFeatureSelector,
  (state: AuthStateInterface) => state.signOutIsInProgress
)

export const signOutMessageSelector = createSelector<AppStateInterface, AuthStateInterface, string | null>(
  authFeatureSelector,
  (state: AuthStateInterface) => state.signOutMessage
)

export const signOutMessageIfSuccessfulSelector = createSelector(
  signOutIsInProgressSelector,
  signOutMessageSelector,
  (signOutIsInProgress: boolean, message: string | null) =>
    signOutIsInProgress ? null : message
)
