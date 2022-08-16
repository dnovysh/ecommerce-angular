import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ParamMap } from "@angular/router";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";
import {
  ProductGetAllResponseInterface
} from "src/app/management/product-management/types/product-get-all-response.interface";


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
}