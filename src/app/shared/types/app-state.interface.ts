import { ProductListStateInterface } from "src/app/catalog/product-list/types/product-list-state.interface";
import { CategoriesStateInterface } from "src/app/shared/modules/categories/types/categories-state.interface";
import { IdentityStateInterface } from "src/app/shared/modules/identity/types/identity-state.interface";
import { AuthStateInterface } from "src/app/auth/types/auth-state.interface";

export interface AppStateInterface {
  productList: ProductListStateInterface
  categories: CategoriesStateInterface
  identity: IdentityStateInterface
  auth: AuthStateInterface
}
