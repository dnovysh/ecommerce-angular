import { Product } from "src/app/management/domain/Product";
import { PageInterface } from "src/app/shared/types/page.interface";
import { ApiErrorInterface } from "src/app/shared/types/error/api-error.interface";

export interface ProductGetAllStateInterface {
  isLoading: boolean
  products: Product[]
  page: PageInterface
  isError: boolean
  error: ApiErrorInterface | null
}
