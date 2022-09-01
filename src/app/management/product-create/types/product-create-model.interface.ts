import { Category } from "src/app/management/domain/Category";

export interface ProductCreateModelInterface {
  dealerId: number;
  sku: string;
  category: Category;
  name: string;
  description: string | null;
  image: string | null;
  active: boolean;
  unitsInStock: number;
  unitPrice: number | null;
}
