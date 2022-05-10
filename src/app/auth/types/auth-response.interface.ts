import { UserDetailsInterface } from "src/app/shared/modules/identity/types/user-details.interface";

export interface AuthResponseInterface {
  userDetails: UserDetailsInterface
  token: string
}
