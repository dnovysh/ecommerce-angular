import { Action, createReducer, on } from "@ngrx/store";
import { ProductListStateInterface } from "src/app/catalog/product-list/types/product-list-state.interface";
import {
  getProductListAction,
  getProductListFailureAction,
  getProductListSuccessAction
} from "src/app/catalog/product-list/store/actions/get-product-list.action";
import {
  getProductListPageSettingsAction,
  getProductListPageSettingsFailureAction,
  getProductListPageSettingsSuccessAction
} from "src/app/catalog/product-list/store/actions/get-product-list-page-settings.action";
import {
  setProductListPageSettingsAction
} from "src/app/catalog/product-list/store/actions/set-product-list-page-settings.action";


const initialState: ProductListStateInterface = {
  isLoading: false,
  error: null,
  data: null,
  pageSettings: {
    isLoading: false,
    size: null,
    failure: false
  }
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
    data: {
      products: action.productListResponse._embedded.products,
      page: action.productListResponse.page
    }
  })),
  on(getProductListFailureAction, (state, action): ProductListStateInterface => ({
    ...state,
    isLoading: false,
    error: action.error,
    data: null
  })),

  on(getProductListPageSettingsAction, (state): ProductListStateInterface => ({
    ...state,
    pageSettings: {
      ...(state.pageSettings),
      isLoading: true
    }
  })),
  on(getProductListPageSettingsSuccessAction, (state, action): ProductListStateInterface => ({
    ...state,
    pageSettings: {
      ...(state.pageSettings),
      isLoading: false,
      size: action.pageSettings.size,
      failure: false
    }
  })),
  on(getProductListPageSettingsFailureAction, (state): ProductListStateInterface => ({
    ...state,
    pageSettings: {
      ...(state.pageSettings),
      isLoading: false,
      failure: true
    }
  })),
  on(setProductListPageSettingsAction, (state, action): ProductListStateInterface => ({
    ...state,
    pageSettings: {
      ...(state.pageSettings),
      size: action.pageSettings.size
    }
  })),
)
