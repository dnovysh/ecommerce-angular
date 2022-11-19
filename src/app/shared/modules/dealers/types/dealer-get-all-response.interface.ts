import { DealerInterface } from "src/app/shared/modules/identity/types/dealer.interface";

export interface DealerGetAllResponseInterface {
  _embedded: {
    dealers: DealerInterface[]
  }
}
