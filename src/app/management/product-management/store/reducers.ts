import { Action, createReducer, on } from "@ngrx/store";

import {
  ProductGetAllStateInterface
} from "src/app/management/product-management/types/product-get-all-state.interface";
import {
  getProductsAction,
  getProductsFailureAction,
  getProductsSuccessAction
} from "src/app/management/product-management/store/actions/get-products.action";


const initialState: ProductGetAllStateInterface = {
  isLoading: false,
  products: null,
  page: null,
  isError: false,
  error: null,
  paramMap: null
}

export const reducer = createReducer<ProductGetAllStateInterface, Action>(
  initialState,
  on(getProductsAction, (state, action): ProductGetAllStateInterface => ({
    ...state,
    isLoading: true,
    isError: false,
    error: null,
    paramMap: action.params
  })),
  on(getProductsSuccessAction, (state, action): ProductGetAllStateInterface => ({
    ...state,
    isLoading: false,
    products: action.data.products,
    page: action.data.page
  })),
  on(getProductsFailureAction, (state, action): ProductGetAllStateInterface => ({
    ...state,
    isLoading: false,
    isError: true,
    error: action.error
  }))
)
