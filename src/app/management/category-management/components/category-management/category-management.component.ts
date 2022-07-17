import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, Subscription } from "rxjs";
import { MessageService } from "primeng/api";
import { select, Store } from "@ngrx/store";
import { Actions } from "@ngrx/effects";
import { EntityAction, EntityOp, ofEntityOp, OP_ERROR } from "@ngrx/data";
import { HttpErrorResponse } from "@angular/common/http";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ApiErrorInterface } from "src/app/shared/types/error/api-error.interface";
import { Category } from "src/app/management/domain/Category";
import { CategoryCollectionService } from "src/app/management/category-management/data/services/category-collection.service";
import { authoritiesSelector } from "src/app/shared/modules/identity/store/selectors";
import { AppStateInterface } from "src/app/shared/types/app-state.interface";
import { NewCategoryFormGroupInterface } from "src/app/management/category-management/data/types/new-category-form-group.interface";


@Component({
  selector: 'ec-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss']
})
export class CategoryManagementComponent implements OnInit, OnDestroy {
  loadingSubscription: Subscription;
  categorySubscription: Subscription;
  dataErrorSubscription: Subscription;
  authoritiesSubscription: Subscription;
  loading: boolean;
  categories: Category[];
  dbCategories: Category[];

  clonedCategories: { [s: string]: Category; } = {};

  error: ApiErrorInterface | null
  accessDenied: boolean
  accessAllowed: boolean | null
  hasCreatePermission: boolean
  hasUpdatePermission: boolean
  hasDeletePermission: boolean

  adding: boolean
  newCategoryForm: FormGroup
  newCategoryNameControl: AbstractControl
  lastNewCategoryName: string = ''

  constructor(private fb: FormBuilder,
              private store: Store<AppStateInterface>,
              private categoryService: CategoryCollectionService,
              private messageService: MessageService,
              private actions$: Actions<EntityAction>) {
    this.subscribeAuthorities()
    this.subscribeCategories()
    this.subscribeLoading()
    this.subscribeDataError()
  }

  ngOnInit(): void {
    const newCategoryInitialValue: NewCategoryFormGroupInterface = {
      newCategoryName: ''
    }
    this.newCategoryForm = this.fb.group(newCategoryInitialValue, { updateOn: 'submit' })
    this.newCategoryNameControl = this.newCategoryForm.controls['newCategoryName']
    this.newCategoryNameControl.addValidators([Validators.required]);
    this.newCategoryNameControl.updateValueAndValidity()
    this.newCategoryForm.controls['newCategoryName'].valueChanges.subscribe((value) => {
      this.newCategoryForm.controls['newCategoryName'].setValue((value || '').trim(), { emitEvent: false })
    })
  }

  ngOnDestroy(): void {
    this.authoritiesSubscription.unsubscribe()
    this.categorySubscription.unsubscribe()
    this.loadingSubscription.unsubscribe()
    this.dataErrorSubscription.unsubscribe()
  }

  // create
  onOpenNew(): void {
    this.adding = true
    this.newCategoryForm.controls['newCategoryName'].setValue(this.lastNewCategoryName);
    this.newCategoryNameControl.markAsPristine()
  }

  onAddNew(): void {
    this.newCategoryNameControl.markAsDirty()
    if (this.newCategoryForm.invalid) {
      return
    }
    const addingCategoryName = this.newCategoryForm.value.newCategoryName
    this.add({ id: 0, name: addingCategoryName })
    this.adding = false
  }

  onCancelNew(): void {
    this.adding = false
  }

  onNewCategoryNameInput($event: Event) {
    const value = ($event.target as HTMLInputElement).value
    if (this.lastNewCategoryName !== value) {
      this.lastNewCategoryName = value
    }
  }

  // read
  onRefresh(): void {
    this.getCategories()
  }

  // update
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

  //delete
  onDeleteCategory(category: Category): void {
    this.delete(category)
  }

  subscribeAuthorities(): void {
    this.authoritiesSubscription = this.store.pipe(select(authoritiesSelector))
      .subscribe((authorities) => {
        this.setAccessAllowed(authorities.has('category.read'))
        this.hasCreatePermission = authorities.has('category.create')
        this.hasUpdatePermission = authorities.has('category.update')
        this.hasDeletePermission = authorities.has('category.delete')
        if (this.accessAllowed) {
          this.getCategories()
        }
      })
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
      this.error = apiError
      const originalActionEntityOp: EntityOp = action.payload.data.originalAction.payload.entityOp
      if (httpErrorStatus === 403) {
        if (originalActionEntityOp === EntityOp.QUERY_ALL) {
          this.setAccessAllowed(false)
          return
        }
        this.messageService.add({ severity: 'error', summary: 'Error', detail: apiError.message })
      } else if (httpErrorStatus === 409) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: apiError.message })
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' })
      }
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
    this.categoryService.add(category, { isOptimistic: false });
  }

  delete(category: Category) {
    this.categoryService.delete(category.id, { isOptimistic: false });
  }

  getCategories() {
    this.clearDataCache()
    this.categoryService.getAll();
  }

  update(category: Category) {
    this.categoryService.update(category, { isOptimistic: false })
  }

  clearDataCache() {
    this.categoryService.clearCache()
  }

  setAccessAllowed(value: boolean): void {
    this.accessAllowed = value
    this.accessDenied = !this.accessAllowed
  }
}
