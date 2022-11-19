import { Product } from "src/app/management/domain/Product";
import { PageInterface } from "src/app/shared/types/page.interface";
import { ApiErrorInterface } from "src/app/shared/types/error/api-error.interface";
import { ParamMap } from "@angular/router";

export interface ProductGetAllStateInterface {
  isLoading: boolean
  products: Product[] | null
  page: PageInterface | null
  isError: boolean
  error: ApiErrorInterface | null
  paramMap: ParamMap | null
}
