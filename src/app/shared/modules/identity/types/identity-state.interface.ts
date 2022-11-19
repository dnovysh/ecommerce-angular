import { UserDetailsInterface } from "src/app/shared/modules/identity/types/user-details.interface";

export interface IdentityStateInterface {
  isLoading: boolean
  isLoggedIn: boolean | null
  userDetails: UserDetailsInterface | null
}
