import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs";

import { PersistenceService } from "src/app/shared/services/persistence.service";
import {
  setProductListPageSettingsAction
} from "src/app/catalog/product-list/store/actions/set-product-list-page-settings.action";


@Injectable()
export class SetProductListPageSettingsEffect {
  constructor(private actions$: Actions,
              private persistenceService: PersistenceService) {}

  setProductListPageSize$ = createEffect(() => this.actions$.pipe(
      ofType(setProductListPageSettingsAction),
      tap((action) => this.persistenceService.set('catalogPageSettings', action.pageSettings))
    ),
    { dispatch: false }
  )
}
