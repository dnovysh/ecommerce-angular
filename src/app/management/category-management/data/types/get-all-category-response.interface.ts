import { Category } from "src/app/management/domain/Category";

export interface GetAllCategoryResponseInterface {
  _embedded: {
    categories: Category[]
  }
}
