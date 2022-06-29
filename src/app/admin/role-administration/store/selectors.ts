import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/types/app-state.interface";
import { RoleInterface } from "src/app/admin/role-administration/types/role.interface";
import { RoleStateInterface } from "src/app/admin/role-administration/types/role-state.interface";
import { ApiErrorInterface } from "src/app/shared/types/error/api-error.interface";


export const rolesFeatureSelector =
  createFeatureSelector<RoleStateInterface>('roles');

export const isLoadingSelector = createSelector<AppStateInterface, RoleStateInterface, boolean>(
  rolesFeatureSelector,
  (state: RoleStateInterface) => state.isLoading
)

export const rolesSelector = createSelector<AppStateInterface,
  RoleStateInterface, RoleInterface[] | null>(
  rolesFeatureSelector,
  (state: RoleStateInterface) => state.data
)

export const errorSelector = createSelector<AppStateInterface, RoleStateInterface, ApiErrorInterface | null>(
  rolesFeatureSelector,
  (state: RoleStateInterface) => state.error
)
