import {
  ProductListPageSettingsStateInterface
} from "src/app/catalog/product-list/types/product-list-page-settings-state.interface";
import { ProductListDataInterface } from "src/app/catalog/product-list/types/product-list-data.interface";
import {
  ProductListLayoutSettingsStateInterface
} from "src/app/catalog/product-list/types/product-list-layout-settings-state.interface";

export interface ProductListStateInterface {
  isLoading: boolean
  error: string | null
  data: ProductListDataInterface | null
  pageSettings: ProductListPageSettingsStateInterface
  layoutSettings: ProductListLayoutSettingsStateInterface
}
