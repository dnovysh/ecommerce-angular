import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthStateInterface } from "src/app/auth/types/auth-state.interface";
import { AppStateInterface } from "src/app/shared/types/app-state.interface";
import { ValidationErrorInterface } from "src/app/shared/types/error/validation-error.interface";


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
      state.error?.validationErrors ? state.error?.validationErrors : null
  )

export const isUnknownErrorSelector = createSelector(
  isErrorSelector,
  validationErrorsSelector,
  (isError: boolean, validationErrors: ValidationErrorInterface[] | null) =>
    isError && (validationErrors === null || validationErrors.length === 0)
)
