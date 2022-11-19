import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForbiddenComponent } from './forbidden.component';
import { RouterModule, Routes } from "@angular/router";

import { AccessDeniedModule } from "src/app/shared/modules/access-denied/access-denied.module";


const routes: Routes = [
  {
    path: 'forbidden',
    component: ForbiddenComponent
  }
]

@NgModule({
  declarations: [
    ForbiddenComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AccessDeniedModule
  ]
})
export class ForbiddenModule {}
