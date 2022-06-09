import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";

import { AppStateInterface } from "src/app/shared/types/app-state.interface";
import { getCategoriesAction } from "src/app/shared/modules/categories/store/get-categories.action";
import { refreshUserDetailsAction } from "src/app/shared/modules/identity/store/actions/refresh-user-details.action";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private store: Store<AppStateInterface>) {
    this.store.dispatch(refreshUserDetailsAction())
  }

  ngOnInit(): void {
    this.store.dispatch(getCategoriesAction())
  }

}
