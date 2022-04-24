import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";

import { ProductCategoryResponseInterface } from "src/app/shared/types/catalog/product-category-response.interface";
import { ProductCategoryInterface } from "src/app/shared/types/catalog/product-category.interface";
import { environment } from "src/environments/environment";

@Injectable()
export class CategoryService {
  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<ProductCategoryInterface[]> {
    const fullUrl = `${environment.catalogApiUrl}/catalog-categories`

    return this.http.get<ProductCategoryResponseInterface>(fullUrl)
      .pipe(map((response) => response._embedded.categories))
  }
}
