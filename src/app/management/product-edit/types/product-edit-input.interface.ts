import { Category } from "src/app/management/domain/Category";

export interface ProductEditInputInterface {
  sku: string | null;
  category: Category | null;
  name: string | null;
  description: string | null;
  image: string | null;
  unitsInStock: number | null;
  unitPrice: number | null;
}
