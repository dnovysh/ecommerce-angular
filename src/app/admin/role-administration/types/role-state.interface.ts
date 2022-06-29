import { ApiErrorInterface } from "src/app/shared/types/error/api-error.interface";
import { RoleInterface } from "src/app/admin/role-administration/types/role.interface";

export interface RoleStateInterface {
  isLoading: boolean
  error: ApiErrorInterface | null
  data: RoleInterface[] | null
}
