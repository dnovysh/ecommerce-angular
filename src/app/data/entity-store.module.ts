import { EntityDataService } from '@ngrx/data';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { CategoryDataService } from "src/app/management/category-management/data/services/category-data.service";


@NgModule({
  imports: [ CommonModule ],
  providers: [ CategoryDataService ]
})
export class EntityStoreModule {
  constructor(
    entityDataService: EntityDataService,
    categoryDataService: CategoryDataService,
  ) {
    entityDataService.registerService('Category', categoryDataService);
  }
}
