import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { ProductManagementComponent } from './components/product-management/product-management.component';
import { AuthGuard } from "src/app/shared/guards/auth-guard.class";
import { ProductManagementGuard } from "src/app/shared/guards/product-management-guard.class";
import { GetProductsEffect } from "src/app/management/product-management/store/effects/get-products.effect";
import { ProductManagementService } from "src/app/management/product-management/service/product-management.service";
import { reducer } from "src/app/management/product-management/store/reducers";

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
    ProductManagementService,
    AuthGuard,
    ProductManagementGuard
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('productGetAll', reducer),
    EffectsModule.forFeature([GetProductsEffect])
  ]
})
export class ProductManagementModule { }
