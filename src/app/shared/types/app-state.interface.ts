import { ProductListStateInterface } from "src/app/catalog/product-list/types/product-list-state.interface";
import { CategoriesStateInterface } from "src/app/shared/modules/categories/types/categories-state.interface";

export interface AppStateInterface {
  productList: ProductListStateInterface
  categoryMenu: CategoriesStateInterface
}
