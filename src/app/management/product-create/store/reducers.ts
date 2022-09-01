import { Action, createReducer, on } from "@ngrx/store";
import { ProductCreateStateInterface } from "src/app/management/product-create/types/product-create-state.interface";
import {
  createProductAction,
  createProductFailureAction,
  createProductSuccessAction
} from "src/app/management/product-create/store/create-product.action";


const initialState: ProductCreateStateInterface = {
  isLoading: false,
  product: null,
  isError: false,
  error: null
}

export const reducer = createReducer<ProductCreateStateInterface, Action>(
  initialState,
  on(createProductAction, (state): ProductCreateStateInterface => ({
    ...state,
    isLoading: true,
    isError: false,
    error: null
  })),
  on(createProductSuccessAction, (state, action): ProductCreateStateInterface => ({
    ...state,
    isLoading: false,
    product: action.product
  })),
  on(createProductFailureAction, (state, action): ProductCreateStateInterface => ({
    ...state,
    isLoading: false,
    isError: true,
    error: action.error
  }))
)
