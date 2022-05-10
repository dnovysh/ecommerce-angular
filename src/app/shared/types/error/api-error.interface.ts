import { ValidationErrorInterface } from "src/app/shared/types/error/validation-error.interface";

export interface ApiErrorInterface {
  status: number
  statusName: string
  timestamp: string
  message: string
  validationErrors?: ValidationErrorInterface[]
}
