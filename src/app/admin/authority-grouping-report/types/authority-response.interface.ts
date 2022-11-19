import { AuthorityInterface } from "src/app/admin/authority-grouping-report/types/authority.interface";

export interface AuthorityResponseInterface {
  _embedded: {
    authorities: AuthorityInterface[]
  }
}
