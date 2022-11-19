import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "src/app/management/product-create/store/action.types";
import { ProductCreateModelInterface } from "src/app/management/product-create/types/product-create-model.interface";
import { Product } from "src/app/management/domain/Product";
import { ApiErrorInterface } from "src/app/shared/types/error/api-error.interface";

export const createProductAction = createAction(
  ActionTypes.CREATE_PRODUCT,
  props<{ productCreateModel: ProductCreateModelInterface }>()
)

export const createProductSuccessAction = createAction(
  ActionTypes.CREATE_PRODUCT_SUCCESS,
  props<{ product: Product }>()
)

export const createProductFailureAction = createAction(
  ActionTypes.CREATE_PRODUCT_FAILURE,
  props<{ error: ApiErrorInterface | null }>()
)
