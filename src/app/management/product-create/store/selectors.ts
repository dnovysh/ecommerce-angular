import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductCreateStateInterface } from "src/app/management/product-create/types/product-create-state.interface";
import { AppStateInterface } from "src/app/shared/types/app-state.interface";
import { ErrorInterface } from "src/app/shared/types/error/error.interface";


export const productCreateFeatureSelector =
  createFeatureSelector<ProductCreateStateInterface>('productCreate');

export const isLoadingSelector =
  createSelector<AppStateInterface, ProductCreateStateInterface, boolean>(
    productCreateFeatureSelector,
    (state: ProductCreateStateInterface) => state.isLoading
  )

export const stateSelector =
  createSelector<AppStateInterface, ProductCreateStateInterface, ProductCreateStateInterface>(
    productCreateFeatureSelector,
    (state: ProductCreateStateInterface) => ({ ...state })
  )

export const errorSelector =
  createSelector<AppStateInterface, ProductCreateStateInterface, ErrorInterface>(
    productCreateFeatureSelector,
    (state: ProductCreateStateInterface) => ({ isError: state.isError, error: state.error })
  )
