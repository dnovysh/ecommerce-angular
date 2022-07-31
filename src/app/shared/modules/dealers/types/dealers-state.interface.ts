import { ApiErrorInterface } from "src/app/shared/types/error/api-error.interface";
import { DealerInterface } from "src/app/shared/modules/identity/types/dealer.interface";

export interface DealersStateInterface {
  isLoading: boolean
  error: ApiErrorInterface | null,
  data: DealerInterface[] | null
}
