import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/types/app-state.interface";
import { ErrorInterface } from "src/app/shared/types/error/error.interface";
import {
  ProductDeleteStateInterface
} from "src/app/management/product-management/types/product-delete-state.interface";

export const productDeleteFeatureSelector =
  createFeatureSelector<ProductDeleteStateInterface>('productDelete');

export const deletionSelector = createSelector<AppStateInterface, ProductDeleteStateInterface, boolean>(
  productDeleteFeatureSelector,
  (state) => state.deletion
)

export const stateSelector =
  createSelector<AppStateInterface, ProductDeleteStateInterface, ProductDeleteStateInterface>(
    productDeleteFeatureSelector,
    (state) => state
  )

export const errorSelector =
  createSelector<AppStateInterface, ProductDeleteStateInterface, ErrorInterface>
  (
    productDeleteFeatureSelector,
    (state) => ({ isError: state.isError, error: state.error })
  )
