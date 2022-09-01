import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductManagementService } from "src/app/shared/services/product-management.service";


@NgModule({
  declarations: [
    ProductCreateComponent
  ],
  providers: [
    ProductManagementService
  ],
  imports: [
    CommonModule
  ]
})
export class ProductCreateModule {}
