import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "src/app/catalog/product-list/store/action.types";
import {
  ProductListPageSettingsInterface
} from "src/app/catalog/product-list/types/product-list-page-settings.interface";

export const setProductListPageSettingsAction = createAction(
  ActionTypes.SET_PRODUCT_LIST_PAGE_SETTINGS,
  props<{ pageSettings: ProductListPageSettingsInterface }>()
)
