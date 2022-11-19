import { UserDetailsDtoInterface } from "src/app/shared/modules/identity/types/user-details-dto.interface";

export interface AuthResponseInterface {
  user: UserDetailsDtoInterface | null
}
