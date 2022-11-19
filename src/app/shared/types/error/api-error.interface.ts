import { ValidationErrorInterface } from "src/app/shared/types/error/validation-error.interface";

export interface ApiErrorInterface {
  status: number
  error: string
  message: string
  requiredAction: string
  timestamp: string
  timestampMs: number
  errors?: ValidationErrorInterface[] | null
  path?: string
  debugMessage?: string
}
