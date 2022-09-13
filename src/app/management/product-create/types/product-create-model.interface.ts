export interface ProductCreateModelInterface {
  dealerId: number;
  sku: string;
  categoryId: number;
  name: string;
  description: string | null;
  image: string | null;
  active: boolean;
  unitsInStock: number;
  unitPrice: number | null;
}
