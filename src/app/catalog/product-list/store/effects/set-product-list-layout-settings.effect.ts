import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs";

import { PersistenceService } from "src/app/shared/services/persistence.service";
import {
  setProductListLayoutSettingsAction
} from "src/app/catalog/product-list/store/actions/set-product-list-layout-settings.action";


@Injectable()
export class SetProductListLayoutSettingsEffect {
  constructor(private actions$: Actions,
              private persistenceService: PersistenceService) {}

  setProductListLayoutSize$ = createEffect(() => this.actions$.pipe(
      ofType(setProductListLayoutSettingsAction),
      tap((action) => this.persistenceService.set('catalogLayoutSettings', action.layoutSettings))
    ),
    { dispatch: false }
  )
}
