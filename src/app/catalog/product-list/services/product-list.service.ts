import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { ProductListResponseInterface } from "src/app/catalog/product-list/types/product-list-response.interface";
import { environment } from "src/environments/environment";
import {
  ProductListApiQueryParamsInterface
} from "src/app/catalog/product-list/types/product-list-api-query-params.interface";


@Injectable()
export class ProductListService {
  baseUrl = `${environment.baseApiUrl}/catalog-products`
  baseSearchUrl = this.baseUrl + '/search'
  defaultQueryAllUrl = this.baseSearchUrl + '/queryAllByOrderByPopularityIndexDescRatingDescIdDesc'

  constructor(private http: HttpClient) {
  }

  getProductList(params: ProductListApiQueryParamsInterface): Observable<ProductListResponseInterface> {
    let suffix = 'projection=inlineCategory'
    if (params.pageSize) {
      suffix = `size=${params.pageSize}&${suffix}`
    }
    if (params.categoryId === null) {
      const fullUrl = `${this.defaultQueryAllUrl}?${suffix}`
      return this.http.get<ProductListResponseInterface>(fullUrl)
    }
    const fullUrl = this.baseSearchUrl + `/findByCategoryId?id=${params.categoryId}&${suffix}`
    return this.http.get<ProductListResponseInterface>(fullUrl)
  }
}
