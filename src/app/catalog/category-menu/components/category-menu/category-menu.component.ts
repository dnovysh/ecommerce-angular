import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { select, Store } from "@ngrx/store";

import { ProductCategoryInterface } from "src/app/shared/types/catalog/product-category.interface";
import { AppStateInterface } from "src/app/shared/types/app-state.interface";
import { categoryMenuSelector, errorSelector, isLoadingSelector } from "src/app/catalog/category-menu/store/selectors";
import { getCategoriesAction } from "src/app/catalog/category-menu/store/actions/get-categories.action";


@Component({
  selector: 'ec-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.scss']
})
export class CategoryMenuComponent implements OnInit {
  isLoading$: Observable<boolean>
  error$: Observable<string | null>
  categories$: Observable<ProductCategoryInterface[] | null>

  constructor(private store: Store<AppStateInterface>) { }

  ngOnInit(): void {
    this.initializeValues()
    this.fetchData()
  }

  private initializeValues() {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
    this.categories$ = this.store.pipe(select(categoryMenuSelector))
  }

  private fetchData(): void {
    this.store.dispatch(getCategoriesAction())
  }
}
