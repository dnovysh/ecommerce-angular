import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { DialogModule } from "primeng/dialog";
import { RippleModule } from "primeng/ripple";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputNumberModule } from "primeng/inputnumber";
import { ToastModule } from "primeng/toast";

import { ProductManagementService } from "src/app/shared/services/product-management.service";
import { ImagePreloadModule } from "src/app/shared/directives/image-preload/image-preload.module";
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { reducer } from 'src/app/management/product-edit/store/reducers';
import { EditProductEffect } from "src/app/management/product-edit/store/edit-product.effect";


@NgModule({
  declarations: [
    ProductEditComponent
  ],
  providers: [
    ProductManagementService
  ],
  imports: [
    CommonModule,
    EffectsModule.forFeature([EditProductEffect]),
    StoreModule.forFeature('productEdit', reducer),
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
    ProductEditComponent
  ]
})
export class ProductEditModule {}
