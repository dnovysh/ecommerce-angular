import { DealerInterface } from "src/app/shared/modules/identity/types/dealer.interface";

export interface UserDetailsInterface {
  id: number
  username: string
  dealerRepresentative: boolean
  dealer: DealerInterface | null
  userAlias: string
}
