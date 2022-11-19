import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/types/app-state.interface";
import { AuthorityStateInterface } from "src/app/admin/authority-grouping-report/types/authority-state.interface";
import { ApiErrorInterface } from "src/app/shared/types/error/api-error.interface";
import { AuthorityInterface } from "src/app/admin/authority-grouping-report/types/authority.interface";

export const authoritiesFeatureSelector =
  createFeatureSelector<AuthorityStateInterface>('authorities');

export const isLoadingSelector = createSelector<AppStateInterface, AuthorityStateInterface, boolean>(
  authoritiesFeatureSelector,
  (state: AuthorityStateInterface) => state.isLoading
)

export const authoritiesSelector = createSelector<AppStateInterface,
  AuthorityStateInterface, AuthorityInterface[] | null>(
  authoritiesFeatureSelector,
  (state: AuthorityStateInterface) => state.data
)

export const errorSelector = createSelector<AppStateInterface, AuthorityStateInterface, ApiErrorInterface | null>(
  authoritiesFeatureSelector,
  (state: AuthorityStateInterface) => state.error
)
