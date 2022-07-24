import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/types/app-state.interface";
import {
  ProductGetAllStateInterface
} from "src/app/management/product-management/types/product-get-all-state.interface";
import { Product } from "src/app/management/domain/Product";
import { PageInterface } from "src/app/shared/types/page.interface";
import { ApiErrorInterface } from "src/app/shared/types/error/api-error.interface";

export const productGetAllFeatureSelector =
  createFeatureSelector<ProductGetAllStateInterface>('productGetAll');

export const isLoadingSelector = createSelector<AppStateInterface, ProductGetAllStateInterface, boolean>(
  productGetAllFeatureSelector,
  (state) => state.isLoading
)

export const productsSelector =
  createSelector<AppStateInterface, ProductGetAllStateInterface, Product[] | null>(
    productGetAllFeatureSelector,
    (state) => state.products
  )

export const pageSelector =
  createSelector<AppStateInterface, ProductGetAllStateInterface, PageInterface | null>(
    productGetAllFeatureSelector,
    (state) => state.page
  )


export const isErrorSelector = createSelector<AppStateInterface, ProductGetAllStateInterface, boolean>(
  productGetAllFeatureSelector,
  (state) => state.isError
)

export const errorSelector =
  createSelector<AppStateInterface, ProductGetAllStateInterface, ApiErrorInterface | null>
  (
    productGetAllFeatureSelector,
    (state) => state.error
  )
