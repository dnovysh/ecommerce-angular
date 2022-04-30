import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { CategoryService } from "src/app/shared/services/category.service";
import { GetCategoriesEffect } from "src/app/shared/modules/categories/store/get-categories.effect";
import { reducer } from "src/app/shared/modules/categories/store/reducers";


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetCategoriesEffect]),
    StoreModule.forFeature('categories', reducer),
  ],
  providers: [
    CategoryService
  ]
})
export class CategoriesModule {}
