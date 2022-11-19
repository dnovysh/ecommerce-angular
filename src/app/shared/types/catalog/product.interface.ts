import {ProductCategoryInterface} from "src/app/shared/types/catalog/product-category.interface";

export interface ProductInterface {
  id: bigint
  dealerId: bigint
  sku: string
  category: ProductCategoryInterface
  name: string
  description: string | null
  image: string | null
  active: boolean
  unitsInStock: number
  unitPrice: number | null
  rating: number | null
  inventoryStatus: string | null
  dateCreated: Date
  lastUpdated: Date
}
