import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";

import { ProductManagementComponent } from './components/product-management/product-management.component';
import { AuthGuard } from "src/app/shared/guards/auth-guard.class";
import { ProductManagementGuard } from "src/app/shared/guards/product-management-guard.class";

const routes: Routes = [
  {
    path: 'management/products',
    component: ProductManagementComponent,
    canActivate: [AuthGuard, ProductManagementGuard]
  }
]

@NgModule({
  declarations: [
    ProductManagementComponent
  ],
  providers:[
    AuthGuard,
    ProductManagementGuard
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ProductManagementModule { }
