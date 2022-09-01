import { ApiErrorInterface } from "src/app/shared/types/error/api-error.interface";

export interface ErrorInterface {
  isError: boolean
  error: ApiErrorInterface | null
}
