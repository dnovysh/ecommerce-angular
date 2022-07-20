import { Product } from "src/app/management/domain/Product";
import { ApiErrorInterface } from "src/app/shared/types/error/api-error.interface";

export interface ProductSaveStateInterface {
  isLoading: boolean
  product: Product
  isError: boolean
  error: ApiErrorInterface | null
}
