import {PageInterface} from "src/app/shared/types/page.interface";
import {ProductInterface} from "src/app/shared/types/catalog/product.interface";

export interface ProductListStateInterface {
  isLoading: boolean,
  error: string | null,
  data: ProductInterface[] | null,
  page: PageInterface | null
}
