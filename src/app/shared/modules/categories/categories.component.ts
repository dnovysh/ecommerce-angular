import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/types/app-state.interface";
import { getCategoriesAction } from "src/app/shared/modules/categories/store/get-categories.action";

@Component({
  selector: 'ec-categories',
  template: ''
})
export class CategoriesComponent implements OnInit {

  constructor(private store: Store<AppStateInterface>) { }

  ngOnInit(): void {
    this.store.dispatch(getCategoriesAction())
  }
}
