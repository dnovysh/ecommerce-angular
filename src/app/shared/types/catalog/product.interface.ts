import {ProductCategoryInterface} from "src/app/shared/types/catalog/product-category.interface";

export interface ProductInterface {
  id: bigint
  dealerId: bigint
  sku: string
  category: ProductCategoryInterface
  name: string
  description: string | null
  imageUrl: string | null
  active: boolean
  unitsInStock: bigint
  unitPrice: number
  dateCreated: Date
  lastUpdated: Date
}
