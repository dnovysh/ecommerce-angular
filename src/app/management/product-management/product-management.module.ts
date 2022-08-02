import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { ProductManagementComponent } from './components/product-management/product-management.component';
import { ProductManagementGuard } from "src/app/shared/guards/product-management-guard.class";
import { GetProductsEffect } from "src/app/management/product-management/store/effects/get-products.effect";
import { ProductManagementService } from "src/app/management/product-management/services/product-management.service";
import { reducer } from "src/app/management/product-management/store/reducers";
import { ToastModule } from "primeng/toast";
import { ToolbarModule } from "primeng/toolbar";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { ImagePreloadModule } from "src/app/shared/directives/image-preload/image-preload.module";
import { DealersModule } from "src/app/shared/modules/dealers/dealers.module";
import { DropdownModule } from "primeng/dropdown";
import { InputNumberModule } from "primeng/inputnumber";

const routes: Routes = [
  {
    path: 'management/products',
    component: ProductManagementComponent,
    canActivate: [ProductManagementGuard]
  }
]

@NgModule({
  declarations: [
    ProductManagementComponent
  ],
  providers: [
    ProductManagementService,
    ProductManagementGuard
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('productGetAll', reducer),
    EffectsModule.forFeature([GetProductsEffect]),
    DealersModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    ButtonModule,
    RippleModule,
    FormsModule,
    InputTextModule,
    ImagePreloadModule,
    DropdownModule,
    InputNumberModule
  ]
})
export class ProductManagementModule {}
