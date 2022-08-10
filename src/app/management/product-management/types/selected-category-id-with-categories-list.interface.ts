import { ProductCategoryInterface } from "src/app/shared/types/catalog/product-category.interface";

export interface SelectedCategoryIdWithCategoriesListInterface {
  categoryId: bigint | null
  categories: ProductCategoryInterface[] | null
}
