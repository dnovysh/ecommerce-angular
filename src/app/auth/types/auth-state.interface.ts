import { ApiErrorInterface } from "src/app/shared/types/error/api-error.interface";

export interface AuthStateInterface {
  isSubmitting: boolean,
  successfullyCompleted: boolean | null
  error: ApiErrorInterface | null
}
