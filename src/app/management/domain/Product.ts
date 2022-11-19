import { Category } from "src/app/management/domain/Category";

export interface Product {
  id: number;
  dealerId: number;
  sku: string;
  category: Category;
  name: string;
  description: string | null;
  image: string | null;
  active: boolean;
  unitsInStock: number;
  unitPrice: number | null;
  rating: number | null;
  popularityIndex: number | null;
  dateCreated: Date;
  lastUpdated: Date;
}
