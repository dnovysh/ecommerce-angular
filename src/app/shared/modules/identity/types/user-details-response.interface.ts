import { UserDetailsInterface } from "src/app/shared/modules/identity/types/user-details.interface";
import { ApiErrorInterface } from "src/app/shared/types/error/api-error.interface";

export interface UserDetailsResponseInterface {
  user: UserDetailsInterface | null
  error: ApiErrorInterface | null
}
