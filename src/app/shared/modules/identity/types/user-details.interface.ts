import { DealerInterface } from "src/app/shared/modules/identity/types/dealer.interface";

export interface UserDetailsInterface {
  id: number
  username: string
  accountNonExpired: boolean
  accountNonLocked: boolean
  credentialsNonExpired: boolean
  enabled: boolean
  dealerRepresentative: boolean
  dealer: DealerInterface | null
  userAlias: string
  roles?: Set<string>
  authorities?: Set<string>
}
