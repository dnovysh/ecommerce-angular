import { createFeatureSelector, createSelector } from "@ngrx/store";

import { IdentityStateInterface } from "src/app/shared/modules/identity/types/identity-state.interface";
import { AppStateInterface } from "src/app/shared/types/app-state.interface";
import { UserDetailsInterface } from "src/app/shared/modules/identity/types/user-details.interface";


export const identityFeatureSelector = createFeatureSelector<IdentityStateInterface>('identity');

export const isLoggedInSelector = createSelector<AppStateInterface, IdentityStateInterface, boolean | null>(
  identityFeatureSelector,
  (state: IdentityStateInterface) => state.isLoggedIn
)

export const isAuthenticatedSelector = createSelector<AppStateInterface, IdentityStateInterface, boolean>(
  identityFeatureSelector,
  (state: IdentityStateInterface) => state.isLoggedIn === true
)

export const isGuestSelector = createSelector<AppStateInterface, IdentityStateInterface, boolean>(
  identityFeatureSelector,
  (state: IdentityStateInterface) => state.isLoggedIn === false
)

export const userDetailsSelector =
  createSelector<AppStateInterface, IdentityStateInterface, UserDetailsInterface | null>(
    identityFeatureSelector,
    (state: IdentityStateInterface) => state.userDetails
  )

export const usernameSelector =
  createSelector<AppStateInterface, IdentityStateInterface, string | null>(
    identityFeatureSelector,
    (state: IdentityStateInterface) => state.userDetails ? state.userDetails.username : null
  )

export const userAliasSelector =
  createSelector<AppStateInterface, IdentityStateInterface, string | null>(
    identityFeatureSelector,
    (state: IdentityStateInterface) => state.userDetails ? state.userDetails.userAlias : null
  )
