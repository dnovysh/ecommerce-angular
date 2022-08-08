import { DealerInterface } from "src/app/shared/modules/identity/types/dealer.interface";

export interface SelectedDealerWithDealersListInterface {
  dealer: DealerInterface | null
  dealers: DealerInterface[] | null
}
