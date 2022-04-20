import {ProductListStateInterface} from "src/app/catalog/product-list/types/product-list-state.interface";
import { CategoryMenuStateInterface } from "src/app/catalog/category-menu/types/category-menu-state.interface";

export interface AppStateInterface {
  productList: ProductListStateInterface
  categoryMenu: CategoryMenuStateInterface
}
