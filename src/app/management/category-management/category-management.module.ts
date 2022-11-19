import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { TableModule } from "primeng/table";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { ToastModule } from "primeng/toast";
import { ToolbarModule } from "primeng/toolbar";

import { CategoryManagementComponent } from './components/category-management/category-management.component';
import { AuthGuard } from "src/app/shared/guards/auth-guard.class";
import { AccessDeniedModule } from "src/app/shared/modules/access-denied/access-denied.module";
import { CategoryService } from "src/app/shared/services/category.service";


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
    CategoryService,
    AuthGuard
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AccessDeniedModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule
  ]
})
export class CategoryManagementModule {}
