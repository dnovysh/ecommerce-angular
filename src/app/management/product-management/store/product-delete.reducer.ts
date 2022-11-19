import { Action, createReducer, on } from "@ngrx/store";
import { routerNavigationAction } from "@ngrx/router-store";

import {
  ProductDeleteStateInterface
} from "src/app/management/product-management/types/product-delete-state.interface";
import {
  deleteProductsAction,
  deleteProductsFailureAction,
  deleteProductsSuccessAction
} from "src/app/management/product-management/store/actions/delete-products.action";


const initialState: ProductDeleteStateInterface = {
  deletion: false,
  idsToRemove: [],
  removedProductIds: [],
  isError: false,
  error: null
}

export const reducer = createReducer<ProductDeleteStateInterface, Action>(
  initialState,
  on(deleteProductsAction, (_state, action): ProductDeleteStateInterface => ({
    ...initialState,
    deletion: true,
    idsToRemove: action.ids,
  })),
  on(deleteProductsSuccessAction, (state, action): ProductDeleteStateInterface => ({
    ...state,
    deletion: false,
    removedProductIds: action.ids,
  })),
  on(deleteProductsFailureAction, (state, action): ProductDeleteStateInterface => ({
    ...state,
    deletion: false,
    isError: true,
    error: action.error
  })),
  on(routerNavigationAction, (): ProductDeleteStateInterface => initialState)
)
