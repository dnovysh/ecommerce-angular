import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MessageService } from "primeng/api";
import { catchError, map, of, switchMap, tap } from "rxjs";

import { ProductManagementService } from "src/app/management/product-management/service/product-management.service";
import {
  getProductsAction,
  getProductsFailureAction,
  getProductsSuccessAction
} from "src/app/management/product-management/store/actions/get-products.action";
import {
  ProductGetAllResponseInterface
} from "src/app/management/product-management/types/product-get-all-response.interface";
import { HttpErrorResponse } from "@angular/common/http";


@Injectable()
export class GetProductsEffect {
  constructor(private actions$: Actions,
              private productManagementService: ProductManagementService,
              private messageService: MessageService) {
  }

  getProducts$ = createEffect(() => this.actions$.pipe(
    ofType(getProductsAction),
    switchMap((action) => {
      return this.productManagementService.getAllProducts(action.params).pipe(
        map((productGetAllResponseInterface: ProductGetAllResponseInterface) =>
          getProductsSuccessAction({ data: productGetAllResponseInterface })
        ),
        catchError((errorResponse: HttpErrorResponse) => of(getProductsFailureAction(
          { error: errorResponse.error }
        )))
      )
    })
  ))

  // ToDo Move to selector and component
  showErrorToast$ = createEffect(() => this.actions$.pipe(
      ofType(getProductsFailureAction),
      tap(({ error }) => {
        const errorMessage = error ? error.message
          : 'Something went wrong while loading products, please try again later or contact support'

        this.messageService.add({
          key: 'productsErrorToast',
          severity: 'error',
          summary: 'Error',
          detail: errorMessage,
          life: 3000
        });
      })
    ),
    { dispatch: false }
  )
}
