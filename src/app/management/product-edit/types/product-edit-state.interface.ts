import { Product } from "src/app/management/domain/Product";
import { ApiErrorInterface } from "src/app/shared/types/error/api-error.interface";

export interface ProductEditStateInterface {
  isLoading: boolean
  product: Product | null
  updatedProduct: Product | null
  isError: boolean
  error: ApiErrorInterface | null
}
