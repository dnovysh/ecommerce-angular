import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { GetDealersEffect } from "src/app/shared/modules/dealers/store/get-dealers.effect";
import { reducer } from "src/app/shared/modules/dealers/store/reducers";
import { DealerService } from "src/app/shared/modules/dealers/services/dealer.service";


@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetDealersEffect]),
    StoreModule.forFeature('dealers', reducer),
  ],
  providers: [
    DealerService
  ]
})
export class DealersModule {}
