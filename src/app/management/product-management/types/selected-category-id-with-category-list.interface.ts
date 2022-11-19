import { Category } from "src/app/management/domain/Category";

export interface SelectedCategoryIdWithCategoryListInterface {
  categoryId: number | null
  categories: Category[] | null
}
