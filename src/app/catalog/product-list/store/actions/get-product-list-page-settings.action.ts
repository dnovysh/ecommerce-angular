import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "src/app/catalog/product-list/store/action.types";
import {
  ProductListPageSettingsInterface
} from "src/app/catalog/product-list/types/product-list-page-settings.interface";


export const getProductListPageSettingsAction = createAction(
  ActionTypes.GET_PRODUCT_LIST_PAGE_SETTINGS
)

export const getProductListPageSettingsSuccessAction = createAction(
  ActionTypes.GET_PRODUCT_LIST_PAGE_SETTINGS_SUCCESS,
  props<{ pageSettings: ProductListPageSettingsInterface }>()
)

export const getProductListPageSettingsFailureAction = createAction(
  ActionTypes.GET_PRODUCT_LIST_PAGE_SETTINGS_FAILURE
)
