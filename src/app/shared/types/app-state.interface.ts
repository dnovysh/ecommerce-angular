import { ProductListStateInterface } from "src/app/catalog/product-list/types/product-list-state.interface";
import { CategoriesStateInterface } from "src/app/shared/modules/categories/types/categories-state.interface";
import { IdentityStateInterface } from "src/app/shared/modules/identity/types/identity-state.interface";
import { AuthStateInterface } from "src/app/auth/types/auth-state.interface";
import { AuthorityStateInterface } from "src/app/admin/authority-grouping-report/types/authority-state.interface";
import { RoleStateInterface } from "src/app/admin/role-administration/types/role-state.interface";
import {
  ProductGetAllStateInterface
} from "src/app/management/product-management/types/product-get-all-state.interface";
import { ProductSaveStateInterface } from "src/app/management/product-management/types/product-save-state.interface";
import {
  ProductDeleteStateInterface
} from "src/app/management/product-management/types/product-delete-state.interface";
import { DealersStateInterface } from "src/app/shared/modules/dealers/types/dealers-state.interface";

export interface AppStateInterface {
  productList: ProductListStateInterface
  categories: CategoriesStateInterface
  identity: IdentityStateInterface
  auth: AuthStateInterface
  authorities: AuthorityStateInterface
  roles: RoleStateInterface
  dealers: DealersStateInterface
  productManagement: ProductGetAllStateInterface
  productSave: ProductSaveStateInterface
  productDelete: ProductDeleteStateInterface
}
