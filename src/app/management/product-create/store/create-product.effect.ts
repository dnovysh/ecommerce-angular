import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

import { ProductManagementService } from "src/app/shared/services/product-management.service";
import {
  createProductAction,
  createProductFailureAction,
  createProductSuccessAction
} from "src/app/management/product-create/store/create-product.action";
import { Product } from "src/app/management/domain/Product";


@Injectable()
export class CreateProductEffect {

  constructor(private actions$: Actions,
              private productManagementService: ProductManagementService) {
  }

  createProduct$ = createEffect(() => this.actions$.pipe(
    ofType(createProductAction),
    switchMap(({ productCreateModel }) =>
      this.productManagementService.createProduct(productCreateModel).pipe(
        map((product: Product) => {
          return createProductSuccessAction({ product })
        }),
        catchError((errorResponse: HttpErrorResponse) =>
          of(createProductFailureAction({ error: errorResponse.error }))
        )
      )
    )
  ))

}
