import {createAction, props} from "@ngrx/store";
import {ActionTypes} from "src/app/catalog/product-list/store/action.types";
import {ProductListResponseInterface} from "src/app/catalog/product-list/types/product-list-response.interface";

export const getProductListAction = createAction(
  ActionTypes.GET_PRODUCT_LIST
)

export const getProductListSuccessAction = createAction(
  ActionTypes.GET_PRODUCT_LIST_SUCCESS,
  props<{ productListResponse: ProductListResponseInterface }>()
)

export const getProductListFailureAction = createAction(
  ActionTypes.GET_PRODUCT_LIST_FAILURE
)
