import { ApiErrorInterface } from "src/app/shared/types/error/api-error.interface";
import { AuthorityInterface } from "src/app/admin/authority-grouping-report/types/authority.interface";

export interface AuthorityStateInterface {
  isLoading: boolean
  error: ApiErrorInterface | null
  data: AuthorityInterface[] | null
}
