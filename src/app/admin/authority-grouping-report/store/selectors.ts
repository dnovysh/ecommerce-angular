import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/types/app-state.interface";
import { AuthorityStateInterface } from "src/app/admin/authority-grouping-report/types/authority-state.interface";
import {
  AuthorityWithGroupingFieldInterface
} from "src/app/admin/authority-grouping-report/types/authority-with-grouping-field.interface";

export const authoritiesFeatureSelector =
  createFeatureSelector<AuthorityStateInterface>('authorities');

export const isLoadingSelector = createSelector<AppStateInterface, AuthorityStateInterface, boolean>(
  authoritiesFeatureSelector,
  (state: AuthorityStateInterface) => state.isLoading
)

export const authoritiesSelector = createSelector<AppStateInterface,
  AuthorityStateInterface, AuthorityWithGroupingFieldInterface[] | null>(
  authoritiesFeatureSelector,
  (state: AuthorityStateInterface) => state.data
)

export const errorSelector = createSelector<AppStateInterface, AuthorityStateInterface, string | null>(
  authoritiesFeatureSelector,
  (state: AuthorityStateInterface) => state.error
)
