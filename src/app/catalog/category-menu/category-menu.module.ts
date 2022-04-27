import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollPanelModule } from "primeng/scrollpanel";

import { CategoryMenuComponent } from './components/category-menu/category-menu.component';
import { RouterModule } from "@angular/router";


@NgModule({
  declarations: [
    CategoryMenuComponent
  ],
  imports: [
    CommonModule,
    ScrollPanelModule,
    RouterModule
  ],
  exports: [
    CategoryMenuComponent
  ]
})
export class CategoryMenuModule {}
