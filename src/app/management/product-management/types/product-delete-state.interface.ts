import { ApiErrorInterface } from "src/app/shared/types/error/api-error.interface";

export interface ProductDeleteStateInterface {
  deletion: boolean
  idsToRemove: number[]
  removedProductIds: number[]
  isError: boolean
  error: ApiErrorInterface | null
}
