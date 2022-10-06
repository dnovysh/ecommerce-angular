import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/types/app-state.interface";
import { ErrorInterface } from "src/app/shared/types/error/error.interface";
import { ProductEditStateInterface } from "src/app/management/product-edit/types/product-edit-state.interface";


export const productEditFeatureSelector =
  createFeatureSelector<ProductEditStateInterface>('productEdit');

export const isLoadingSelector =
  createSelector<AppStateInterface, ProductEditStateInterface, boolean>(
    productEditFeatureSelector,
    (state: ProductEditStateInterface) => state.isLoading
  )

export const stateSelector =
  createSelector<AppStateInterface, ProductEditStateInterface, ProductEditStateInterface>(
    productEditFeatureSelector,
    (state: ProductEditStateInterface) => ({ ...state })
  )

export const errorSelector =
  createSelector<AppStateInterface, ProductEditStateInterface, ErrorInterface>(
    productEditFeatureSelector,
    (state: ProductEditStateInterface) => ({ isError: state.isError, error: state.error })
  )
