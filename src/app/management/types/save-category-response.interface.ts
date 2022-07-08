import { Category } from "src/app/management/domain/Category";

export interface SaveCategoryResponseInterface {
  _embedded: {
    category: Category
  }
}
