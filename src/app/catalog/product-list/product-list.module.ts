import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductListComponent} from './components/product-list/product-list.component';
import {ProductListService} from "src/app/catalog/product-list/services/product-list.service";


@NgModule({
  declarations: [
    ProductListComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    ProductListService
  ],
  exports: [
    ProductListComponent
  ]
})
export class ProductListModule {
}
