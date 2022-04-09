import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {ProductListResponseInterface} from "src/app/catalog/product-list/types/product-list-response.interface";
import {environment} from "src/environments/environment";


@Injectable()
export class ProductListService {
  constructor(private http: HttpClient) {
  }

  getProductList(): Observable<ProductListResponseInterface> {
    const fullUrl = `${environment.apiUrl}/catalog-products?projection=inlineCategory`

    return this.http.get<ProductListResponseInterface>(fullUrl)
  }
}
