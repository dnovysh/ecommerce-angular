import {
  AuthorityWithGroupingFieldInterface
} from "src/app/admin/authority-grouping-report/types/authority-with-grouping-field.interface";
import { ApiErrorInterface } from "src/app/shared/types/error/api-error.interface";

export interface AuthorityStateInterface {
  isLoading: boolean
  error: ApiErrorInterface | null
  data: AuthorityWithGroupingFieldInterface[] | null
}
