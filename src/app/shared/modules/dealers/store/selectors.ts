import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DealersStateInterface } from "src/app/shared/modules/dealers/types/dealers-state.interface";
import { AppStateInterface } from "src/app/shared/types/app-state.interface";
import { ApiErrorInterface } from "src/app/shared/types/error/api-error.interface";
import { DealerInterface } from "src/app/shared/modules/identity/types/dealer.interface";
import { LoadingDealersSliceInterface } from "src/app/shared/modules/dealers/types/loading-dealers-slice.interface";

export const dealersFeatureSelector =
  createFeatureSelector<DealersStateInterface>('dealers');

export const isLoadingSelector = createSelector<AppStateInterface, DealersStateInterface, boolean>(
  dealersFeatureSelector,
  (dealersState: DealersStateInterface) => dealersState.isLoading
)

export const errorSelector = createSelector<AppStateInterface, DealersStateInterface, ApiErrorInterface | null>(
  dealersFeatureSelector,
  (dealersState: DealersStateInterface) => dealersState.error
)

export const dealersSelector = createSelector<AppStateInterface,
  DealersStateInterface, DealerInterface[] | null>(
  dealersFeatureSelector,
  (dealersState: DealersStateInterface) => dealersState.data
)

export const loadingDealersSliceSelector = createSelector<AppStateInterface,
  DealersStateInterface, LoadingDealersSliceInterface>(
  dealersFeatureSelector,
  (dealersState: DealersStateInterface) => ({
    isLoading: dealersState.isLoading,
    dealers: dealersState.data
  })
)
