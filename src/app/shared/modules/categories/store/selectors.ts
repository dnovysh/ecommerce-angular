import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/types/app-state.interface";
import { CategoriesStateInterface } from "src/app/shared/modules/categories/types/categories-state.interface";
import { ProductCategoryInterface } from "src/app/shared/types/catalog/product-category.interface";
import {
  LoadingCategoriesSliceInterface
} from "src/app/shared/modules/categories/types/loading-categories-slice.interface";

export const categoriesFeatureSelector =
  createFeatureSelector<CategoriesStateInterface>('categories');

export const isLoadingSelector = createSelector<AppStateInterface, CategoriesStateInterface, boolean>(
  categoriesFeatureSelector,
  (categoriesState: CategoriesStateInterface) => categoriesState.isLoading
)

export const errorSelector = createSelector<AppStateInterface, CategoriesStateInterface, string | null>(
  categoriesFeatureSelector,
  (categoriesState: CategoriesStateInterface) => categoriesState.error
)

export const categoriesSelector = createSelector<AppStateInterface,
  CategoriesStateInterface, ProductCategoryInterface[] | null>(
  categoriesFeatureSelector,
  (categoriesState: CategoriesStateInterface) => categoriesState.data
)

export const loadingCategoriesSliceSelector = createSelector<AppStateInterface,
  CategoriesStateInterface, LoadingCategoriesSliceInterface>(
  categoriesFeatureSelector,
  (categoriesState: CategoriesStateInterface) => ({
    isLoading: categoriesState.isLoading,
    categories: categoriesState.data
  })
)
