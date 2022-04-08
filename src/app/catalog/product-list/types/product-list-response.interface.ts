import {ProductInterface} from "src/app/shared/types/catalog/product.interface";
import {PageInterface} from "src/app/shared/types/page.interface";

export interface ProductListResponseInterface {
  _embedded: {
    products: ProductInterface[]
  },
  page: PageInterface
}
