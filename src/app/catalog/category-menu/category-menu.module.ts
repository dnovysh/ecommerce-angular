import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ScrollPanelModule } from "primeng/scrollpanel";

import { CategoryMenuComponent } from './components/category-menu/category-menu.component';
import { GetCategoriesEffect } from "src/app/catalog/category-menu/store/effects/get-categories.effect";
import { reducer } from "src/app/catalog/category-menu/store/reducers";
import { CategoryService } from "src/app/shared/services/category.service";
import { RouterModule } from "@angular/router";


@NgModule({
  declarations: [
    CategoryMenuComponent
  ],
  imports: [
    CommonModule,
    ScrollPanelModule,
    EffectsModule.forFeature([GetCategoriesEffect]),
    StoreModule.forFeature('categoryMenu', reducer),
    RouterModule
  ],
  providers: [
    CategoryService
  ],
  exports: [
    CategoryMenuComponent
  ]
})
export class CategoryMenuModule {}
