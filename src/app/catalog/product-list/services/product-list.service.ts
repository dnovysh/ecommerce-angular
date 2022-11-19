import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
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
  defaultQueryAllUrl = this.baseSearchUrl + '/queryAllDefault'

  constructor(private http: HttpClient) {
  }

  getProductList(apiParams: ProductListApiQueryParamsInterface): Observable<ProductListResponseInterface> {
    let params = new HttpParams()
    let url: string
    if (apiParams.categoryId !== null && apiParams.name) {
      params = params.append('id', apiParams.categoryId)
      params = params.append('name', apiParams.name)
      url = `${this.baseSearchUrl}/findByCategoryIdAndProductName`
    } else if (apiParams.categoryId !== null) {
      params = params.append('id', apiParams.categoryId)
      url = `${this.baseSearchUrl}/findByCategoryId`
    } else if (apiParams.name) {
      params = params.append('name', apiParams.name)
      url = `${this.baseSearchUrl}/findByProductName`
    } else {
      url = this.defaultQueryAllUrl
    }
    if (apiParams.page !== null) {
      params = params.append('page', apiParams.page)
    }
    params = params.append('size', apiParams.size)
    params = params.append('projection', 'inlineCategory')

    return this.http.get<ProductListResponseInterface>(url, { params })
  }
}
