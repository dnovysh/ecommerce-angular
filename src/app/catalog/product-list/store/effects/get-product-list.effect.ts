import {Injectable} from "@angular/core"
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {MessageService} from "primeng/api";

import {ProductListService} from "src/app/catalog/product-list/services/product-list.service";
import {
  getProductListAction,
  getProductListFailureAction,
  getProductListSuccessAction
} from "src/app/catalog/product-list/store/actions/get-product-list.action";
import {ProductListResponseInterface} from "src/app/catalog/product-list/types/product-list-response.interface";


@Injectable()
export class GetProductListEffect {
  constructor(private actions$: Actions,
              private productListService: ProductListService,
              private messageService: MessageService) {
  }

  getProductList$ = createEffect(() => this.actions$.pipe(
    ofType(getProductListAction),
    switchMap(() => {
      return this.productListService.getProductList().pipe(
        map((productListResponse: ProductListResponseInterface) =>
          getProductListSuccessAction({productListResponse})
        ),
        catchError(() => of(getProductListFailureAction(
          {error: 'Something went wrong while loading the catalog, please try again later or contact support'}
        )))
      )
    })
  ))

  showErrorToast$ = createEffect(() => this.actions$.pipe(
      ofType(getProductListFailureAction),
      tap(({error}) => {
        if (error) {
          this.messageService.add({
            key: 'productListErrorToast',
            severity: 'error',
            summary: 'Error',
            detail: error,
            life: 5000
          });
        }
      })
    ),
    {dispatch: false}
  )
}
