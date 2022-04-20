import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/types/app-state.interface";
import { CategoryMenuStateInterface } from "src/app/catalog/category-menu/types/category-menu-state.interface";
import { ProductCategoryInterface } from "src/app/shared/types/catalog/product-category.interface";

export const categoryMenuFeatureSelector =
  createFeatureSelector<CategoryMenuStateInterface>('categoryMenu');

export const isLoadingSelector = createSelector<AppStateInterface, [CategoryMenuStateInterface], boolean>(
  categoryMenuFeatureSelector,
  (categoryMenuState: CategoryMenuStateInterface) => categoryMenuState.isLoading
)

export const errorSelector = createSelector<AppStateInterface, [CategoryMenuStateInterface], string | null>(
  categoryMenuFeatureSelector,
  (categoryMenuState: CategoryMenuStateInterface) => categoryMenuState.error
)

export const categoryMenuSelector = createSelector<AppStateInterface,
  [CategoryMenuStateInterface], ProductCategoryInterface[] | null>(
  categoryMenuFeatureSelector,
  (categoryMenuState: CategoryMenuStateInterface) => categoryMenuState.data
)
