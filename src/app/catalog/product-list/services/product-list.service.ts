import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { ProductListResponseInterface } from "src/app/catalog/product-list/types/product-list-response.interface";
import { environment } from "src/environments/environment";


@Injectable()
export class ProductListService {
  baseUrl = `${environment.baseApiUrl}/catalog-products`
  baseSearchUrl = this.baseUrl + '/search'
  defaultQueryAllUrl = this.baseSearchUrl +
    '/queryAllByOrderByPopularityIndexDescRatingDescIdDesc?projection=inlineCategory'

  constructor(private http: HttpClient) {
  }

  getProductList(categoryId: number | null): Observable<ProductListResponseInterface> {
    if (categoryId == null) {
      return this.http.get<ProductListResponseInterface>(this.defaultQueryAllUrl)
    }
    const fullUrl = this.baseSearchUrl + `/findByCategoryId?id=${categoryId}&projection=inlineCategory`
    return this.http.get<ProductListResponseInterface>(fullUrl)
  }
}
