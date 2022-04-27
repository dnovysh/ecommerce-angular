import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/types/app-state.interface";
import { CategoriesStateInterface } from "src/app/shared/modules/categories/types/categories-state.interface";
import { ProductCategoryInterface } from "src/app/shared/types/catalog/product-category.interface";
import { categoriesFeatureSelector } from "src/app/shared/modules/categories/store/selectors";


export const categoryMenuSelector = createSelector<AppStateInterface,
  CategoriesStateInterface, ProductCategoryInterface[] | null>(
  categoriesFeatureSelector,
  (categoriesState: CategoriesStateInterface) => categoriesState.data
)
