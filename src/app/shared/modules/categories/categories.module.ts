import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { CategoriesComponent } from './categories.component';
import { CategoryService } from "src/app/shared/services/category.service";
import { GetCategoriesEffect } from "src/app/shared/modules/categories/store/get-categories.effect";
import { reducer } from "src/app/shared/modules/categories/store/reducers";


@NgModule({
  declarations: [
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetCategoriesEffect]),
    StoreModule.forFeature('categories', reducer),
  ],
  providers: [
    CategoryService
  ],
  exports: [
    CategoriesComponent
  ]
})
export class CategoriesModule {}
