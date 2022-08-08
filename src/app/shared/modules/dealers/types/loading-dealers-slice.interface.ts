import { DealerInterface } from "src/app/shared/modules/identity/types/dealer.interface";

export interface LoadingDealersSliceInterface {
  isLoading: boolean
  dealers: DealerInterface[] | null
}
