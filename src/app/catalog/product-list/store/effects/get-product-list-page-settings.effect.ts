import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { PersistenceService } from "src/app/shared/services/persistence.service";
import { catchError, of, switchMap } from "rxjs";
import {
  getProductListPageSettingsAction,
  getProductListPageSettingsFailureAction,
  getProductListPageSettingsSuccessAction
} from "src/app/catalog/product-list/store/actions/get-product-list-page-settings.action";
import {
  ProductListPageSettingsInterface
} from "src/app/catalog/product-list/types/product-list-page-settings.interface";


@Injectable()
export class GetProductListPageSettingsEffect {

  constructor(private actions$: Actions,
              private persistenceService: PersistenceService) { }

  getProductListPageSettings$ = createEffect(() => this.actions$.pipe(
    ofType(getProductListPageSettingsAction),
    switchMap(() => {
      const pageSettings: ProductListPageSettingsInterface =
        this.persistenceService.get('catalogPageSettings')
      if (pageSettings && pageSettings.size) {
        return of(getProductListPageSettingsSuccessAction({ pageSettings }))
      }
      return of(getProductListPageSettingsFailureAction())
    }),
    catchError(() => of(getProductListPageSettingsFailureAction()))
  ))
}
