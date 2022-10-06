import { Action, createReducer, on } from "@ngrx/store";
import { ProductEditStateInterface } from "src/app/management/product-edit/types/product-edit-state.interface";
import {
  getProductAction,
  getProductFailureAction,
  getProductSuccessAction,
  updateProductAction,
  updateProductFailureAction,
  updateProductSuccessAction
} from "src/app/management/product-edit/store/edit-product.action";


const initialState: ProductEditStateInterface = {
  isLoading: false,
  product: null,
  updatedProduct: null,
  isError: false,
  error: null
}

export const reducer = createReducer<ProductEditStateInterface, Action>(
  initialState,
  on(getProductAction, (state): ProductEditStateInterface => ({
    ...initialState,
    isLoading: true
  })),
  on(getProductSuccessAction, (state, action): ProductEditStateInterface => ({
    ...state,
    isLoading: false,
    product: action.product
  })),
  on(getProductFailureAction, (state, action): ProductEditStateInterface => ({
    ...state,
    isLoading: false,
    isError: true,
    error: action.error
  })),

  on(updateProductAction, (state): ProductEditStateInterface => ({
    ...state,
    isLoading: true,
    isError: false,
    error: null
  })),
  on(updateProductSuccessAction, (state, action): ProductEditStateInterface => ({
    ...state,
    isLoading: false,
    updatedProduct: action.updatedProduct
  })),
  on(updateProductFailureAction, (state, action): ProductEditStateInterface => ({
    ...state,
    isLoading: false,
    isError: true,
    error: action.error
  }))
)
