import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { DialogModule } from "primeng/dialog";

import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductManagementService } from "src/app/shared/services/product-management.service";
import { CreateProductEffect } from "src/app/management/product-create/store/create-product.effect";
import { reducer } from 'src/app/management/product-create/store/reducers';
import { ImagePreloadModule } from "src/app/shared/directives/image-preload/image-preload.module";
import { RippleModule } from "primeng/ripple";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputNumberModule } from "primeng/inputnumber";
import { ToastModule } from "primeng/toast";


@NgModule({
  declarations: [
    ProductCreateComponent
  ],
  providers: [
    ProductManagementService
  ],
    imports: [
        CommonModule,
        EffectsModule.forFeature([CreateProductEffect]),
        StoreModule.forFeature('productCreate', reducer),
        DialogModule,
        ImagePreloadModule,
        RippleModule,
        ButtonModule,
        DropdownModule,
        FormsModule,
        InputTextModule,
        InputTextareaModule,
        InputNumberModule,
        ToastModule
    ],
  exports: [
    ProductCreateComponent
  ]
})
export class ProductCreateModule {}
