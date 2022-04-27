import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "src/app/catalog/product-list/store/action.types";
import {
  ProductListLayoutSettingsInterface
} from "src/app/catalog/product-list/types/product-list-layout-settings.interface";


export const setProductListLayoutSettingsAction = createAction(
  ActionTypes.SET_PRODUCT_LIST_LAYOUT_SETTINGS,
  props<{ layoutSettings: ProductListLayoutSettingsInterface }>()
)
