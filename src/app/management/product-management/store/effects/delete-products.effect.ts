import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import {
  deleteProductsAction,
  deleteProductsFailureAction,
  deleteProductsSuccessAction
} from "src/app/management/product-management/store/actions/delete-products.action";
import { ProductManagementService } from "src/app/shared/services/product-management.service";


@Injectable()
export class DeleteProductsEffect {
  constructor(private actions$: Actions,
              private productManagementService: ProductManagementService) {
  }

  deleteProducts$ = createEffect(() => this.actions$.pipe(
    ofType(deleteProductsAction),
    switchMap((action) => {
      return this.productManagementService.deleteProducts(action.ids).pipe(
        map(() => deleteProductsSuccessAction({ ids: action.ids })),
        catchError((errorResponse: HttpErrorResponse) => of(deleteProductsFailureAction(
          { error: errorResponse.error }
        )))
      )
    })
  ))
}
