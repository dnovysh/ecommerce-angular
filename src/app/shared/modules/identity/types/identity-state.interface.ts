import { UserDetailsInterface } from "src/app/shared/modules/identity/types/user-details.interface";

export interface IdentityStateInterface {
  isLoggedIn: boolean | null
  userDetailsIsLoading: boolean
  userDetails: UserDetailsInterface | null
}
