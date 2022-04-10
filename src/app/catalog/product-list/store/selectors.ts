import {createFeatureSelector, createSelector} from "@ngrx/store";

import {ProductListStateInterface} from "src/app/catalog/product-list/types/product-list-state.interface";
import {AppStateInterface} from "src/app/shared/types/app-state.interface";
import {ProductInterface} from "src/app/shared/types/catalog/product.interface";
import {PageInterface} from "src/app/shared/types/page.interface";


export const productListFeatureSelector = createFeatureSelector<ProductListStateInterface>('productList');

export const isLoadingSelector = createSelector<AppStateInterface, [ProductListStateInterface], boolean>(
  productListFeatureSelector,
  (productListState: ProductListStateInterface) => productListState.isLoading
)

export const errorSelector = createSelector<AppStateInterface, [ProductListStateInterface], string | null>(
  productListFeatureSelector,
  (productListState: ProductListStateInterface) => productListState.error
)

export const productListSelector = createSelector<AppStateInterface,
  [ProductListStateInterface], ProductInterface[] | null>(
  productListFeatureSelector,
  (productListState: ProductListStateInterface) => productListState.data
)

export const pageSelector = createSelector<AppStateInterface, [ProductListStateInterface], PageInterface | null>(
  productListFeatureSelector,
  (productListState: ProductListStateInterface) => productListState.page
)
