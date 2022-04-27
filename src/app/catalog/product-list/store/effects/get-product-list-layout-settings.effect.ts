import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, of, switchMap } from "rxjs";

import { PersistenceService } from "src/app/shared/services/persistence.service";
import {
  getProductListLayoutSettingsAction,
  getProductListLayoutSettingsFailureAction,
  getProductListLayoutSettingsSuccessAction
} from "src/app/catalog/product-list/store/actions/get-product-list-layout-settings.action";
import {
  ProductListLayoutSettingsInterface
} from "src/app/catalog/product-list/types/product-list-layout-settings.interface";


@Injectable()
export class GetProductListLayoutSettingsEffect {

  constructor(private actions$: Actions,
              private persistenceService: PersistenceService) { }

  getProductListLayoutSettings$ = createEffect(() => this.actions$.pipe(
    ofType(getProductListLayoutSettingsAction),
    switchMap(() => {
      const layoutSettings: ProductListLayoutSettingsInterface =
        this.persistenceService.get('catalogLayoutSettings')
      if (layoutSettings && layoutSettings.layout) {
        return of(getProductListLayoutSettingsSuccessAction({ layoutSettings }))
      }
      return of(getProductListLayoutSettingsFailureAction())
    }),
    catchError(() => of(getProductListLayoutSettingsFailureAction()))
  ))
}
