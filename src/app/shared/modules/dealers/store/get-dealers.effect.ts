import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { DealerInterface } from "src/app/shared/modules/identity/types/dealer.interface";
import {
  getDealersAction,
  getDealersFailureAction,
  getDealersSuccessAction
} from "src/app/shared/modules/dealers/store/get-dealers.action";
import { DealerService } from "src/app/shared/modules/dealers/services/dealer.service";


@Injectable()
export class GetDealersEffect {
  constructor(private actions$: Actions,
              private dealerService: DealerService) {
  }

  getDealers$ = createEffect(() => this.actions$.pipe(
    ofType(getDealersAction),
    switchMap(() => {
      return this.dealerService.getAllDealers().pipe(
        map((dealers: DealerInterface[]) =>
          getDealersSuccessAction({ dealers })
        ),
        catchError((errorResponse: HttpErrorResponse) => of(getDealersFailureAction(
          { error: errorResponse.error }
        )))
      )
    })
  ))
}
