import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";

import { ApiErrorInterface } from "src/app/shared/types/error/api-error.interface";
import { Category } from "src/app/management/domain/Category";
import { CategoryCollectionService } from "src/app/management/services/category-collection.service";


@Component({
  selector: 'ec-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss']
})
export class CategoryManagementComponent implements OnInit {
  loading$: Observable<boolean>;
  categories$: Observable<Category[]>;

  error: ApiErrorInterface | null
  accessDenied: boolean
  accessAllowed: boolean

  constructor(private categoryService: CategoryCollectionService) {
    this.categories$ = categoryService.entities$;
    this.loading$ = categoryService.loading$;
  }

  ngOnInit(): void {
    this.categoryService.getAll()
  }

  add(category: Category) {
    this.categoryService.add(category);
  }

  delete(category: Category) {
    this.categoryService.delete(category.id);
  }

  getHeroes() {
    this.categoryService.getAll();
  }

  update(category: Category) {
    this.categoryService.update(category)
  }

}
