import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

import { AuthorityGroupingReportComponent } from './authority-grouping-report.component';
import { LoadingModule } from "src/app/shared/modules/loading/loading.module";
import { AuthGuard } from "src/app/shared/impl/auth-guard.class";
import { AuthorityService } from "src/app/admin/authority-grouping-report/services/authority.service";
import { GetAuthoritiesEffect } from "src/app/admin/authority-grouping-report/store/get-authorities.effect";
import { reducer } from "src/app/admin/authority-grouping-report/store/reducers";
import { TableModule } from "primeng/table";
import { AccessDeniedModule } from "src/app/shared/modules/access-denied/access-denied.module";


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
            GetAuthoritiesEffect
        ]),
        StoreModule.forFeature('authorities', reducer),
        LoadingModule,
        TableModule,
        AccessDeniedModule,
    ]
})
export class AuthorityGroupingReportModule {}
