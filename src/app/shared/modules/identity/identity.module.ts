import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { UserDetailsService } from "src/app/shared/modules/identity/services/user-details.service";
import { reducer } from "src/app/shared/modules/identity/store/reducers";
import { RefreshUserDetailsEffect } from "src/app/shared/modules/identity/store/effects/refresh-user-details.effect";
import { UserDetailsMapper } from "src/app/shared/modules/identity/mappers/user-details.mapper";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('identity', reducer),
    EffectsModule.forFeature([
      RefreshUserDetailsEffect
    ])
  ],
  providers: [
    UserDetailsService,
    UserDetailsMapper
  ]
})
export class IdentityModule {}
