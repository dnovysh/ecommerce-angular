import { AuthorityInterface } from "src/app/admin/authority-grouping-report/types/authority.interface";

export class RoleInterface {
  id: number
  name: string
  authorities: AuthorityInterface[]
}
