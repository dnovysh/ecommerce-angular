import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from "@ngrx/store";
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessageService} from "primeng/api";
import {DataViewModule} from "primeng/dataview";
import {ButtonModule} from "primeng/button";
import {ToastModule} from "primeng/toast";
import {SelectButtonModule} from "primeng/selectbutton";
import {PanelModule} from "primeng/panel";
import {FormsModule} from "@angular/forms";
import {RippleModule} from "primeng/ripple";

import {ProductListComponent} from './components/product-list/product-list.component';
import {ProductListService} from "src/app/catalog/product-list/services/product-list.service";
import {reducer} from "src/app/catalog/product-list/store/reducers";
import {GetProductListEffect} from "src/app/catalog/product-list/store/effects/get-product-list.effect";
import {LoadingModule} from "src/app/shared/modules/loading/loading.module";
import {ErrorMessageModule} from "src/app/shared/modules/error-message/error-message.module";


@NgModule({
  declarations: [
    ProductListComponent
  ],
  imports: [
    CommonModule,
    DataViewModule,
    ButtonModule,
    SelectButtonModule,
    PanelModule,
    RippleModule,
    FormsModule,
    ToastModule,
    EffectsModule.forFeature([GetProductListEffect]),
    StoreModule.forFeature('productList', reducer),
    LoadingModule,
    ErrorMessageModule
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
