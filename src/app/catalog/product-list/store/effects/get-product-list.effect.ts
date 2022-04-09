import {Injectable} from "@angular/core"
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, of, switchMap} from "rxjs";

import {ProductListService} from "src/app/catalog/product-list/services/product-list.service";
import {
  getProductListAction,
  getProductListFailureAction,
  getProductListSuccessAction
} from "src/app/catalog/product-list/store/actions/get-product-list.action";
import {ProductListResponseInterface} from "src/app/catalog/product-list/types/product-list-response.interface";


@Injectable()
export class GetFeedEffect {
  constructor(private actions$: Actions,
              private productListService: ProductListService) {
  }

  getProductList$ = createEffect(() => this.actions$.pipe(
    ofType(getProductListAction),
    switchMap(() => {
      return this.productListService.getProductList().pipe(
        map((productListResponse: ProductListResponseInterface) =>
          getProductListSuccessAction({productListResponse})
        ),
        catchError(() => of(getProductListFailureAction()))
      )
    })
  ))
}
