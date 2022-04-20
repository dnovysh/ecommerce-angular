import { PageInterface } from "src/app/shared/types/page.interface";
import { ProductCategoryInterface } from "src/app/shared/types/catalog/product-category.interface";

export interface ProductCategoryResponseInterface {
  _embedded: {
    categories: ProductCategoryInterface[]
  },
  page: PageInterface
}
