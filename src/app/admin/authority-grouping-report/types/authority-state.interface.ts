import {
  AuthorityWithGroupingFieldInterface
} from "src/app/admin/authority-grouping-report/types/authority-with-grouping-field.interface";

export interface AuthorityStateInterface {
  isLoading: boolean
  error: string | null
  data: AuthorityWithGroupingFieldInterface[] | null
}
