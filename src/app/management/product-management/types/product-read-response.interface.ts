import { Product } from "src/app/management/domain/Product";
import { PageInterface } from "src/app/shared/types/page.interface";

export interface ProductReadResponseInterface {
  products: Product[],
  page: PageInterface
}
