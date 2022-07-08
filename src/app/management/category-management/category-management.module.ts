import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from "@angular/router";

import { CategoryManagementComponent } from './components/category-management/category-management.component';
import { AuthGuard } from "src/app/shared/impl/auth-guard.class";
import { AccessDeniedModule } from "src/app/shared/modules/access-denied/access-denied.module";
import { TableModule } from "primeng/table";


const routes: Routes = [
  {
    path: 'management/categories',
    component: CategoryManagementComponent,
    canActivate: [AuthGuard]
  }
]

@NgModule({
  declarations: [
    CategoryManagementComponent
  ],
  providers: [
    AuthGuard
  ],
  imports: [
    CommonModule,
    AccessDeniedModule,
    TableModule
  ]
})
export class CategoryManagementModule { }
