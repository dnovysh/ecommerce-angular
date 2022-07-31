import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

import { ProductManagementService } from "src/app/management/product-management/services/product-management.service";
import {
  getProductsAction,
  getProductsFailureAction,
  getProductsSuccessAction
} from "src/app/management/product-management/store/actions/get-products.action";
import {
  ProductGetAllResponseInterface
} from "src/app/management/product-management/types/product-get-all-response.interface";


@Injectable()
export class GetProductsEffect {
  constructor(private actions$: Actions,
              private productManagementService: ProductManagementService) {
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
}
