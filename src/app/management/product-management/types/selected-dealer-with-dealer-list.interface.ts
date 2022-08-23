import { DealerInterface } from "src/app/shared/modules/identity/types/dealer.interface";

export interface SelectedDealerWithDealerListInterface {
  dealer: DealerInterface | null
  dealers: DealerInterface[] | null
}
