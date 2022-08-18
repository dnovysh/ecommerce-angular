import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "src/app/management/product-management/store/action.types";
import { ApiErrorInterface } from "src/app/shared/types/error/api-error.interface";

export const deleteProductsAction = createAction(
  ActionTypes.DELETE_PRODUCTS,
  props<{ ids: number[] }>()
)

export const deleteProductsSuccessAction = createAction(
  ActionTypes.DELETE_PRODUCTS_SUCCESS,
  props<{ ids: number[] }>()
)

export const deleteProductsFailureAction = createAction(
  ActionTypes.DELETE_PRODUCTS_FAILURE,
  props<{ error: ApiErrorInterface | null }>()
)
