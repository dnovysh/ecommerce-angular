import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from "primeng/api";
import { DataViewModule } from "primeng/dataview";
import { ButtonModule } from "primeng/button";
import { ToastModule } from "primeng/toast";
import { SelectButtonModule } from "primeng/selectbutton";
import { PanelModule } from "primeng/panel";
import { FormsModule } from "@angular/forms";
import { RippleModule } from "primeng/ripple";
import { RatingModule } from "primeng/rating";
import { RouterModule } from "@angular/router";

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductListService } from "src/app/catalog/product-list/services/product-list.service";
import { reducer } from "src/app/catalog/product-list/store/reducers";
import { GetProductListEffect } from "src/app/catalog/product-list/store/effects/get-product-list.effect";
import { LoadingModule } from "src/app/shared/modules/loading/loading.module";
import { ErrorMessageModule } from "src/app/shared/modules/error-message/error-message.module";
import { ImagePreloadModule } from "src/app/shared/directives/image-preload/image-preload.module";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { DividerModule } from "primeng/divider";
import { CategoryMenuModule } from "src/app/catalog/category-menu/category-menu.module";
import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from "primeng/dropdown";


const routes = [
  { path: 'category/:categoryId', component: ProductListComponent },
  { path: 'category', component: ProductListComponent },
  { path: 'products', component: ProductListComponent }
]

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
        RouterModule.forChild(routes),
        EffectsModule.forFeature([GetProductListEffect]),
        StoreModule.forFeature('productList', reducer),
        LoadingModule,
        ErrorMessageModule,
        RatingModule,
        ImagePreloadModule,
        ScrollPanelModule,
        DividerModule,
        CategoryMenuModule,
        InputTextModule,
        DropdownModule
    ],
  providers: [
    ProductListService,
    MessageService
  ],
  exports: [
    ProductListComponent
  ]
})
export class ProductListModule {}
