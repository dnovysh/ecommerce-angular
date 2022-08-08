import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/types/app-state.interface";
import {
  ProductGetAllStateInterface
} from "src/app/management/product-management/types/product-get-all-state.interface";
import { ProductGetAllDataInterface } from "src/app/management/product-management/types/product-get-all-data.interface";
import { ErrorInterface } from "src/app/management/product-management/types/error.interface";

export const productGetAllFeatureSelector =
  createFeatureSelector<ProductGetAllStateInterface>('productGetAll');

export const isLoadingSelector = createSelector<AppStateInterface, ProductGetAllStateInterface, boolean>(
  productGetAllFeatureSelector,
  (state) => state.isLoading
)

export const dataSelector =
  createSelector<AppStateInterface, ProductGetAllStateInterface, ProductGetAllDataInterface>(
    productGetAllFeatureSelector,
    (state) => ({ products: state.products, page: state.page })
  )

export const errorSelector =
  createSelector<AppStateInterface, ProductGetAllStateInterface, ErrorInterface>
  (
    productGetAllFeatureSelector,
    (state) => ({ isError: state.isError, error: state.error })
  )

export const stateSelector =
  createSelector<AppStateInterface, ProductGetAllStateInterface, ProductGetAllStateInterface>(
    productGetAllFeatureSelector,
    (state) => state
  )
