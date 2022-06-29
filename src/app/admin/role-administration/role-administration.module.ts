import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { TableModule } from "primeng/table";

import { AuthGuard } from "src/app/shared/impl/auth-guard.class";
import { GetRolesEffect } from "src/app/admin/role-administration/store/get-roles.effect";
import { reducer } from "src/app/admin/role-administration/store/reducers";
import { LoadingModule } from "src/app/shared/modules/loading/loading.module";
import { RoleService } from "src/app/admin/role-administration/services/role.service";
import { RoleAdministrationComponent } from "src/app/admin/role-administration/role-administration.component";
import { AccordionModule } from "primeng/accordion";
import { AccessDeniedModule } from "src/app/shared/modules/access-denied/access-denied.module";


const routes: Routes = [
  {
    path: 'admin/roles',
    component: RoleAdministrationComponent,
    canActivate: [AuthGuard]
  }
]

@NgModule({
  declarations: [
    RoleAdministrationComponent
  ],
  providers: [
    RoleService,
    AuthGuard
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([GetRolesEffect]),
    StoreModule.forFeature('roles', reducer),
    LoadingModule,
    TableModule,
    AccordionModule,
    AccessDeniedModule,
  ]
})
export class RoleAdministrationModule {}
