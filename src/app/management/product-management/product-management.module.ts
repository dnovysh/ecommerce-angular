import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { ToastModule } from "primeng/toast";
import { ToolbarModule } from "primeng/toolbar";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from "primeng/dropdown";
import { InputNumberModule } from "primeng/inputnumber";

import { ProductManagementComponent } from './components/product-management/product-management.component';
import { ProductManagementGuard } from "src/app/shared/guards/product-management-guard.class";
import { GetProductsEffect } from "src/app/management/product-management/store/effects/get-products.effect";
import { ProductManagementService } from "src/app/shared/services/product-management.service";
import { reducer as productGetAllReducer } from "src/app/management/product-management/store/product-get-all.reducer";
import { reducer as productDeleteReducer } from "src/app/management/product-management/store/product-delete.reducer";
import { ImagePreloadModule } from "src/app/shared/directives/image-preload/image-preload.module";
import { DealersModule } from "src/app/shared/modules/dealers/dealers.module";
import { DeleteProductsEffect } from "src/app/management/product-management/store/effects/delete-products.effect";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService } from "primeng/api";


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
    ProductManagementGuard,
    ConfirmationService
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('productGetAll', productGetAllReducer),
    StoreModule.forFeature('productDelete', productDeleteReducer),
    EffectsModule.forFeature([GetProductsEffect, DeleteProductsEffect]),
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
    InputNumberModule,
    ConfirmDialogModule
  ]
})
export class ProductManagementModule {}
