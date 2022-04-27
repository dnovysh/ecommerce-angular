import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { select, Store } from "@ngrx/store";

import { ProductCategoryInterface } from "src/app/shared/types/catalog/product-category.interface";
import { AppStateInterface } from "src/app/shared/types/app-state.interface";
import { categoryMenuSelector } from "src/app/catalog/category-menu/components/store/selectors";


@Component({
  selector: 'ec-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.scss']
})
export class CategoryMenuComponent implements OnInit {
  categories$: Observable<ProductCategoryInterface[] | null>

  constructor(private store: Store<AppStateInterface>) { }

  ngOnInit(): void {
    this.categories$ = this.store.pipe(select(categoryMenuSelector))
  }
}
