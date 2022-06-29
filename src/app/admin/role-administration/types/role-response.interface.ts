import { RoleInterface } from "src/app/admin/role-administration/types/role.interface";

export interface RoleResponseInterface {
  _embedded: {
    roles: RoleInterface[]
  }
}
