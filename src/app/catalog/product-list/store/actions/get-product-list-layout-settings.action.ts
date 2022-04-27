import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "src/app/catalog/product-list/store/action.types";
import {
  ProductListLayoutSettingsInterface
} from "src/app/catalog/product-list/types/product-list-layout-settings.interface";


export const getProductListLayoutSettingsAction = createAction(
  ActionTypes.GET_PRODUCT_LIST_LAYOUT_SETTINGS
)

export const getProductListLayoutSettingsSuccessAction = createAction(
  ActionTypes.GET_PRODUCT_LIST_LAYOUT_SETTINGS_SUCCESS,
  props<{ layoutSettings: ProductListLayoutSettingsInterface }>()
)

export const getProductListLayoutSettingsFailureAction = createAction(
  ActionTypes.GET_PRODUCT_LIST_LAYOUT_SETTINGS_FAILURE
)
