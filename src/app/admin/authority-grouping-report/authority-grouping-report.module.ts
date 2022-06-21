import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

import { AuthorityGroupingReportComponent } from './authority-grouping-report.component';
import { LoadingModule } from "src/app/shared/modules/loading/loading.module";
import { AuthGuard } from "src/app/shared/impl/auth-guard.class";
import { AuthorityService } from "src/app/admin/authority-grouping-report/services/authority.service";
import { GetCategoriesEffect } from "src/app/admin/authority-grouping-report/store/get-authorities.effect";
import { reducer } from "src/app/admin/authority-grouping-report/store/reducers";


const routes: Routes = [
  {
    path: 'admin/authorities',
    component: AuthorityGroupingReportComponent,
    canActivate: [AuthGuard]
  }
]

@NgModule({
  declarations: [
    AuthorityGroupingReportComponent
  ],
  providers: [
    AuthorityService,
    AuthGuard
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([
      GetCategoriesEffect
    ]),
    StoreModule.forFeature('authorities', reducer),
    LoadingModule,
  ]
})
export class AuthorityGroupingReportModule {}
