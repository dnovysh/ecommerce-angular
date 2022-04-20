import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";

import { CategoryService } from "src/app/shared/services/category.service";
import {
  getCategoriesAction,
  getCategoriesFailureAction,
  getCategoriesSuccessAction
} from "src/app/catalog/category-menu/store/actions/get-categories.action";
import { ProductCategoryInterface } from "src/app/shared/types/catalog/product-category.interface";


@Injectable()
export class GetCategoriesEffect {
  constructor(private actions$: Actions,
              private categoryService: CategoryService) {
  }

  getCategories$ = createEffect(() => this.actions$.pipe(
    ofType(getCategoriesAction),
    switchMap(() => {
      return this.categoryService.getAllCategories().pipe(
        map((categories: ProductCategoryInterface[]) =>
          getCategoriesSuccessAction({categories})
        ),
        catchError(() => of(getCategoriesFailureAction()))
      )
    })
  ))
}
