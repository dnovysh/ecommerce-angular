import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "src/app/management/product-edit/store/action.types";
import { ProductUpdateModelInterface } from "src/app/management/product-edit/types/product-update-model.interface";
import { Product } from "src/app/management/domain/Product";
import { ApiErrorInterface } from "src/app/shared/types/error/api-error.interface";


export const getProductAction = createAction(
  ActionTypes.GET_PRODUCT,
  props<{ id: number }>()
)

export const getProductSuccessAction = createAction(
  ActionTypes.GET_PRODUCT_SUCCESS,
  props<{ product: Product }>()
)

export const getProductFailureAction = createAction(
  ActionTypes.GET_PRODUCT_FAILURE,
  props<{ error: ApiErrorInterface | null }>()
)


export const updateProductAction = createAction(
  ActionTypes.UPDATE_PRODUCT,
  props<{ id: number, productUpdateModel: ProductUpdateModelInterface }>()
)

export const updateProductSuccessAction = createAction(
  ActionTypes.UPDATE_PRODUCT_SUCCESS,
  props<{ updatedProduct: Product }>()
)

export const updateProductFailureAction = createAction(
  ActionTypes.UPDATE_PRODUCT_FAILURE,
  props<{ error: ApiErrorInterface | null }>()
)
