import { ProductCategoryInterface } from "src/app/shared/types/catalog/product-category.interface";

export interface LoadingCategoriesSliceInterface {
  isLoading: boolean
  categories: ProductCategoryInterface[] | null
}
