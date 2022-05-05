import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { UserDetailsService } from "src/app/shared/modules/identity/services/user-details.service";
import { reducer } from "src/app/shared/modules/identity/store/reducers";
import { GetUserDetailsEffect } from "src/app/shared/modules/identity/store/effects/get-user-details.effect";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('identity', reducer),
    EffectsModule.forFeature([
      GetUserDetailsEffect
    ])
  ],
  providers: [
    UserDetailsService
  ]
})
export class IdentityModule {}
