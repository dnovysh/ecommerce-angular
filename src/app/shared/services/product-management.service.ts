import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { ParamMap } from "@angular/router";
import { map, Observable } from "rxjs";

import { environment } from "src/environments/environment";
import {
  ProductGetAllResponseInterface
} from "src/app/management/product-management/types/product-get-all-response.interface";
import { Product } from "src/app/management/domain/Product";
import { ProductCreateModelInterface } from "src/app/management/product-create/types/product-create-model.interface";
import { ProductResponseInterface } from "src/app/shared/types/management/product-response.interface";
import { ProductUpdateModelInterface } from "src/app/management/product-edit/types/product-update-model.interface";


@Injectable()
export class ProductManagementService {
  baseUrl = `${environment.baseApiUrl}/management/products`

  constructor(private http: HttpClient) {
  }

  getAllProducts(paramMap: ParamMap): Observable<ProductGetAllResponseInterface> {
    let params = new HttpParams()
    for (const key of paramMap.keys) {
      const values = paramMap.getAll(key)
      if (values.length === 1) {
        params = params.set(key, values[0])
      } else {
        params = params.appendAll({ [key]: values })
      }
    }

    return this.http.get<ProductGetAllResponseInterface>(this.baseUrl, { params })
  }

  getProductById(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.http
      .get<ProductResponseInterface>(url)
      .pipe(map((response: ProductResponseInterface) => response.product))
  }

  createProduct(productCreateModel: ProductCreateModelInterface): Observable<Product> {
    return this.http
      .post<ProductResponseInterface>(this.baseUrl, { productCreateModel })
      .pipe(map((response: ProductResponseInterface) => response.product))
  }

  updateProduct(id: number, productUpdateModel: ProductUpdateModelInterface): Observable<Product> {
    const url = `${this.baseUrl}/${id}`

    return this.http
      .put<ProductResponseInterface>(url, { productUpdateModel })
      .pipe(map((response: ProductResponseInterface) => response.product))
  }

  deleteProducts(ids: number[]): Observable<{}> {
    if (ids.length === 1) {
      return this.deleteProductById(ids[0])
    } else {
      return this.deleteAllProductsById(ids)
    }
  }

  deleteProductById(id: number): Observable<{}> {
    const url = `${this.baseUrl}/${id}`

    return this.http.delete<{}>(url)
  }

  deleteAllProductsById(ids: number[]): Observable<{}> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: { ids }
    }

    return this.http.delete<{}>(this.baseUrl, options)
  }
}
