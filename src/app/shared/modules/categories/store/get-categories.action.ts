import { createAction, props } from "@ngrx/store";

import { ActionTypes } from "src/app/shared/modules/categories/store/action.types";
import { ProductCategoryInterface } from "src/app/shared/types/catalog/product-category.interface";

export const getCategoriesAction = createAction(
  ActionTypes.GET_CATEGORIES
)

export const getCategoriesSuccessAction = createAction(
  ActionTypes.GET_CATEGORIES_SUCCESS,
  props<{ categories: ProductCategoryInterface[] }>()
)

export const getCategoriesFailureAction = createAction(
  ActionTypes.GET_CATEGORIES_FAILURE
)
