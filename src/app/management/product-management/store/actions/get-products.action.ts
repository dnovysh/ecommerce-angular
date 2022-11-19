import { createAction, props } from "@ngrx/store";
import { ParamMap } from "@angular/router";

import { ActionTypes } from "src/app/management/product-management/store/action.types";
import {
  ProductGetAllResponseInterface
} from "src/app/management/product-management/types/product-get-all-response.interface";
import { ApiErrorInterface } from "src/app/shared/types/error/api-error.interface";


export const getProductsAction = createAction(
  ActionTypes.GET_PRODUCTS,
  props<{ params: ParamMap }>()
)

export const getProductsSuccessAction = createAction(
  ActionTypes.GET_PRODUCTS_SUCCESS,
  props<{ data: ProductGetAllResponseInterface }>()
)

export const getProductsFailureAction = createAction(
  ActionTypes.GET_PRODUCTS_FAILURE,
  props<{ error: ApiErrorInterface | null }>()
)
