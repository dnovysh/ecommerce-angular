import { Category } from "src/app/management/domain/Category";
import { DealerInterface } from "src/app/shared/modules/identity/types/dealer.interface";

export interface ProductCreateInputInterface {
  dealerId: number | null;
  dealer: DealerInterface | null;
  sku: string | null;
  category: Category | null;
  name: string | null;
  description: string | null;
  image: string | null;
  unitsInStock: number | null;
  unitPrice: number | null;
}
