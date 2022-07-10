import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { MessageService } from "primeng/api";

import { ApiErrorInterface } from "src/app/shared/types/error/api-error.interface";
import { Category } from "src/app/management/domain/Category";
import { CategoryCollectionService } from "src/app/management/services/category-collection.service";


@Component({
  selector: 'ec-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss']
})
export class CategoryManagementComponent implements OnInit, OnDestroy {
  loadingSubscription: Subscription;
  categorySubscription: Subscription;
  loading: boolean;
  categories: Category[];
  dbCategories: Category[];

  clonedCategories: { [s: string]: Category; } = {};
  updatingId: number | null

  error: ApiErrorInterface | null
  accessDenied: boolean
  accessAllowed: boolean = true

  constructor(private categoryService: CategoryCollectionService,
              private messageService: MessageService) {
    this.categorySubscription = categoryService.entities$.subscribe((categories) => {
      this.dbCategories = categories
      const resultCategories = new Array<Category>()
      categories.forEach((category) => {
        resultCategories.push({ ...category })
      })
      this.categories = resultCategories
    });
    this.loadingSubscription = categoryService.loading$.subscribe((loading) => {
      this.loading = loading
      if (this.updatingId && !loading) {
        let category = this.categories.find((category) => category.id === this.updatingId)
        const dbCategory = this.dbCategories.find((category) => category.id === this.updatingId)
        if (category && dbCategory && category.name !== dbCategory?.name) {
          const index = this.categories.findIndex((category) => category.id === this.updatingId)
          this.categories[index] = { ...dbCategory }
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Invalid name' })
        }
      }
    });
  }

  ngOnInit(): void {
    this.getCategories()
  }

  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe()
    this.loadingSubscription.unsubscribe()
  }

  onRowEditInit(category: Category) {
    this.clonedCategories[category.id] = { ...category };
  }

  onRowEditSave(category: Category) {
    this.updatingId = category.id
    this.update(category)
    delete this.clonedCategories[category.id];
  }

  onRowEditCancel(category: Category, index: number) {
    this.categories[index] = this.clonedCategories[category.id];
    delete this.clonedCategories[category.id];
  }

  add(category: Category) {
    this.categoryService.add(category);
  }

  delete(category: Category) {
    this.categoryService.delete(category.id);
  }

  getCategories() {
    this.categoryService.getAll();
  }

  update(category: Category) {
    this.categoryService.update(category)
  }
}
