import { ApiErrorInterface } from "src/app/shared/types/error/api-error.interface";

export interface ProductDeleteStateInterface {
  isLoading: boolean
  id: number
  isError: boolean
  error: ApiErrorInterface | null
}
