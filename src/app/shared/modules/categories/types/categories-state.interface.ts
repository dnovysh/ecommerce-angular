import { ProductCategoryInterface } from "src/app/shared/types/catalog/product-category.interface";

export interface CategoriesStateInterface {
  isLoading: boolean
  error: string | null,
  data: ProductCategoryInterface[] | null
}
