import { Category } from "src/app/management/domain/Category";

export interface CategoryResponseInterface {
  _embedded: {
    category: Category
  }
}
