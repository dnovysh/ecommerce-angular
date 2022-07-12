import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, Subscription } from "rxjs";
import { MessageService } from "primeng/api";
import { Actions } from "@ngrx/effects";
import { EntityAction, EntityOp, ofEntityOp, OP_ERROR } from "@ngrx/data";
import { HttpErrorResponse } from "@angular/common/http";

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
  dataErrorSubscription: Subscription;
  loading: boolean;
  categories: Category[];
  dbCategories: Category[];

  clonedCategories: { [s: string]: Category; } = {};

  error: ApiErrorInterface | null
  accessDenied: boolean
  accessAllowed: boolean = true

  constructor(private categoryService: CategoryCollectionService,
              private messageService: MessageService,
              private actions$: Actions<EntityAction>) {
    this.subscribeCategories()
    this.subscribeLoading()
    this.subscribeDataError()
  }

  ngOnInit(): void {
    this.getCategories()
  }

  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe()
    this.loadingSubscription.unsubscribe()
    this.dataErrorSubscription.unsubscribe()
  }

  onRowEditInit(category: Category) {
    this.clonedCategories[category.id] = { ...category };
  }

  onRowEditSave(category: Category) {
    this.update(category)
    delete this.clonedCategories[category.id];
  }

  onRowEditCancel(category: Category, index: number) {
    this.categories[index] = this.clonedCategories[category.id];
    delete this.clonedCategories[category.id];
  }

  subscribeCategories(): void {
    this.categorySubscription = this.categoryService.entities$.subscribe((categories) => {
      this.dbCategories = categories
      const resultCategories = new Array<Category>()
      categories.forEach((category) => {
        resultCategories.push({ ...category })
      })
      this.categories = resultCategories
    })
  }

  subscribeLoading(): void {
    this.loadingSubscription = this.categoryService.loading$.subscribe((loading) => {
      this.loading = loading
    })
  }

  subscribeDataError(): void {
    this.dataErrorSubscription = this.actions$.pipe(
      ofEntityOp(),
      filter((ea: EntityAction) =>
        ea.payload.entityOp.endsWith(OP_ERROR) &&
        ea.payload.entityName === 'Category'
      )
    ).subscribe(action => {
      const httpErrorResponse: HttpErrorResponse = action.payload.data.error.error
      const httpErrorStatus = httpErrorResponse.status
      const apiError: ApiErrorInterface = httpErrorResponse.error
      if (httpErrorStatus === 403) {

        //ToDo

        this.messageService.add({ severity: 'error', summary: 'Error', detail: apiError.message })
      } else if (httpErrorStatus === 409) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: apiError.message })
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' })
      }
      const originalActionEntityOp: EntityOp = action.payload.data.originalAction.payload.entityOp
      if (originalActionEntityOp === EntityOp.SAVE_UPDATE_ONE) {
        const id: number = action.payload.data.originalAction.payload.data.id
        const categoryIndex = this.categories.findIndex((category) => category.id === id)
        const dbCategoryIndex = this.dbCategories.findIndex((category) => category.id === id)
        if (categoryIndex >= 0 && dbCategoryIndex >= 0) {
          this.categories[categoryIndex] = { ...this.dbCategories[dbCategoryIndex] }
        }
      }
    })
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
