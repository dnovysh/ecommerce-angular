import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/types/app-state.interface";
import { ProductListStateInterface } from "src/app/catalog/product-list/types/product-list-state.interface";
import { ProductListDataInterface } from "src/app/catalog/product-list/types/product-list-data.interface";
import {
  ProductListPageSettingsStateInterface
} from "src/app/catalog/product-list/types/product-list-page-settings-state.interface";


export const productListFeatureSelector = createFeatureSelector<ProductListStateInterface>('productList');

export const isLoadingSelector = createSelector<AppStateInterface, ProductListStateInterface, boolean>(
  productListFeatureSelector,
  (state) => state.isLoading
)

export const errorSelector = createSelector<AppStateInterface, ProductListStateInterface, string | null>(
  productListFeatureSelector,
  (state) => state.error
)

export const productListDataSelector =
  createSelector<AppStateInterface, ProductListStateInterface, ProductListDataInterface | null>(
    productListFeatureSelector,
    (state) => state.data
  )

export const pageSettingsSelector =
  createSelector<AppStateInterface, ProductListStateInterface, ProductListPageSettingsStateInterface | null>(
    productListFeatureSelector,
    (state) => state.pageSettings
  )
