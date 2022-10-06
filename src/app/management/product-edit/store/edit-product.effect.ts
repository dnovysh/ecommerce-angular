import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

import { ProductManagementService } from "src/app/shared/services/product-management.service";
import { Product } from "src/app/management/domain/Product";
import {
  getProductAction,
  getProductFailureAction,
  getProductSuccessAction,
  updateProductAction,
  updateProductFailureAction,
  updateProductSuccessAction
} from "src/app/management/product-edit/store/edit-product.action";


@Injectable()
export class EditProductEffect {

  constructor(private actions$: Actions,
              private productManagementService: ProductManagementService) {
  }

  getProduct$ = createEffect(() => this.actions$.pipe(
    ofType(getProductAction),
    switchMap(({ id }) =>
      this.productManagementService.getProductById(id).pipe(
        map((product: Product) => {
          return getProductSuccessAction({ product })
        }),
        catchError((errorResponse: HttpErrorResponse) =>
          of(getProductFailureAction({ error: errorResponse.error }))
        )
      )
    )
  ))

  updateProduct$ = createEffect(() => this.actions$.pipe(
    ofType(updateProductAction),
    switchMap(({ id, productUpdateModel }) =>
      this.productManagementService.updateProduct(id, productUpdateModel).pipe(
        map((product: Product) => {
          return updateProductSuccessAction({ updatedProduct: product })
        }),
        catchError((errorResponse: HttpErrorResponse) =>
          of(updateProductFailureAction({ error: errorResponse.error }))
        )
      )
    )
  ))

}
