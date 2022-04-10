import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from "@ngrx/store";
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessageService} from "primeng/api";

import {ProductListComponent} from './components/product-list/product-list.component';
import {ProductListService} from "src/app/catalog/product-list/services/product-list.service";
import {reducer} from "src/app/catalog/product-list/store/reducers";
import {GetProductListEffect} from "src/app/catalog/product-list/store/effects/get-product-list.effect";
import {LoadingModule} from "src/app/shared/modules/loading/loading.module";
import {ErrorMessageModule} from "src/app/shared/modules/error-message/error-message.module";
import {DataViewModule} from "primeng/dataview";
import {ButtonModule} from "primeng/button";
import {ToastModule} from "primeng/toast";


@NgModule({
  declarations: [
    ProductListComponent
  ],
    imports: [
        CommonModule,
        EffectsModule.forFeature([GetProductListEffect]),
        StoreModule.forFeature('productList', reducer),
        LoadingModule,
        ErrorMessageModule,
        DataViewModule,
        ButtonModule,
        ToastModule
    ],
  providers: [
    ProductListService,
    MessageService
  ],
  exports: [
    ProductListComponent
  ]
})
export class ProductListModule {
}
