import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { TableModule } from "primeng/table";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";

import { CategoryManagementComponent } from './components/category-management/category-management.component';
import { AuthGuard } from "src/app/shared/impl/auth-guard.class";
import { AccessDeniedModule } from "src/app/shared/modules/access-denied/access-denied.module";
import { CategoryService } from "src/app/shared/services/category.service";
import { ToastModule } from "primeng/toast";


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
        InputTextModule,
        ButtonModule,
        RippleModule,
        ToastModule
    ]
})
export class CategoryManagementModule { }
