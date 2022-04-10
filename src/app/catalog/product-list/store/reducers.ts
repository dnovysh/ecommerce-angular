import {Action, createReducer, on} from "@ngrx/store";
import {ProductListStateInterface} from "src/app/catalog/product-list/types/product-list-state.interface";
import {
  getProductListAction,
  getProductListFailureAction,
  getProductListSuccessAction
} from "src/app/catalog/product-list/store/actions/get-product-list.action";


const initialState: ProductListStateInterface = {
  isLoading: false,
  error: null,
  data: null,
  page: null
}

export const reducer = createReducer<ProductListStateInterface, Action>(
  initialState,
  on(getProductListAction, (state): ProductListStateInterface => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(getProductListSuccessAction, (state, action): ProductListStateInterface => ({
    ...state,
    isLoading: false,
    data: action.productListResponse._embedded.products,
    page: action.productListResponse.page
  })),
  on(getProductListFailureAction, (state, action): ProductListStateInterface => ({
    ...state,
    isLoading: false,
    error: action.error,
    data: null,
    page: null
  }))
)
