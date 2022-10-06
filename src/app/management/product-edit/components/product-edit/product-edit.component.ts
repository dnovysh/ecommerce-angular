import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { filter, Subscription } from "rxjs";
import { MessageService } from "primeng/api";

import { CatalogHelpers } from "src/app/shared/helpers/catalog-helpers.class";
import { AppStateInterface } from "src/app/shared/types/app-state.interface";
import { Category } from "src/app/management/domain/Category";
import { Product } from "src/app/management/domain/Product";
import { loadingCategoriesSliceSelector } from "src/app/shared/modules/categories/store/selectors";
import { ApiErrorInterface } from "src/app/shared/types/error/api-error.interface";
import { ProductEditInputInterface } from "src/app/management/product-edit/types/product-edit-input.interface";
import { ProductUpdateModelInterface } from "src/app/management/product-edit/types/product-update-model.interface";
import { getProductAction, updateProductAction } from "src/app/management/product-edit/store/edit-product.action";
import { errorSelector, stateSelector } from "src/app/management/product-edit/store/selectors";
import { ProductEditStateInterface } from "src/app/management/product-edit/types/product-edit-state.interface";


@Component({
  selector: 'ec-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit, OnDestroy {
  @Input("productId") productIdProps: number
  @Output("updateProduct") productUpdateEvent = new EventEmitter<Product | null>()

  stateSubscription: Subscription
  categoriesSubscription: Subscription
  errorSubscription: Subscription

  isLoading: boolean
  productId: number
  productInput: ProductEditInputInterface
  productInputInitialized: boolean

  initialCategory: Category
  categoryList: Category[];

  isError: boolean
  error: ApiErrorInterface | null

  submitted: boolean

  getProductImageSrc = CatalogHelpers.getProductImageSrc
  getDefaultProductImage = CatalogHelpers.getDefaultProductImage

  constructor(private store: Store<AppStateInterface>, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.store.dispatch(getProductAction({ id: this.productIdProps }))
    this.initializeValues()
    this.initializeListeners()
  }

  private initializeValues(): void {
    this.submitted = false
    this.productInputInitialized = false
    this.categoryList = []
  }

  private initializeListeners() {
    this.subscribeToState()
    this.subscribeToCategories()
    this.subscribeToError()
  }

  ngOnDestroy(): void {
    this.stateSubscription.unsubscribe()
    this.categoriesSubscription.unsubscribe()
    this.errorSubscription.unsubscribe()
  }

  hideDialog() {
    this.productUpdateEvent.emit(null)
  }

  saveProduct() {
    if (this.saveProductDisabled()) {
      return
    }
    this.submitted = true
    if (this.productInput.sku === null ||
      !this.productInput.category ||
      this.productInput.name === null ||
      this.productInput.unitsInStock === null
    ) {
      return
    }
    const productUpdateModel: ProductUpdateModelInterface = {
      sku: this.productInput.sku,
      categoryId: this.productInput.category.id,
      name: this.productInput.name,
      description: this.productInput.description,
      image: this.productInput.image,
      active: true,
      unitsInStock: this.productInput.unitsInStock,
      unitPrice: this.productInput.unitPrice
    }
    this.store.dispatch(updateProductAction({ id: this.productId, productUpdateModel }))
  }

  saveProductDisabled(): boolean {
    return this.isLoading || !this.productInputInitialized || this.productId === undefined
  }

  private subscribeToState(): void {
    this.stateSubscription = this.store
      .pipe(select(stateSelector))
      .subscribe((state: ProductEditStateInterface) => {
        this.isLoading = state.isLoading
        if (state.isLoading) {
          return
        }
        if (state.isError) {
          return
        }
        if (state.product && !this.productInputInitialized) {
          this.initializeInput(state.product)
          this.productId = state.product.id
          return
        }
        if (state.updatedProduct) {
          this.productUpdateEvent.emit(state.updatedProduct)
        }
      })
  }

  private initializeInput(product: Product): void {
    if (this.productInputInitialized) {
      return
    }
    this.productInput = {
      sku: product.sku,
      category: null,
      name: product.name,
      description: product.description,
      image: product.image,
      unitsInStock: product.unitsInStock,
      unitPrice: product.unitPrice
    }
    this.initialCategory = product.category
    this.setInitialDropDownCategory()
    this.productInputInitialized = true
  }

  private subscribeToCategories(): void {
    this.categoriesSubscription = this.store
      .pipe(select(loadingCategoriesSliceSelector),
        filter(slice => !slice.isLoading && slice.categories !== null))
      .subscribe(slice => {
        if (slice.categories) {
          this.categoryList = slice.categories.map((category): Category => ({
            id: Number(category.id),
            name: category.name
          }))
          this.setInitialDropDownCategory()
        }
      })
  }

  private setInitialDropDownCategory(): void {
    if (this.categoryList && this.categoryList.length > 0 && this.initialCategory) {
      const foundCategory = this.categoryList.find(category => category.id === this.initialCategory.id)
      this.productInput.category = foundCategory ? foundCategory : null
    }
  }

  private subscribeToError(): void {
    this.errorSubscription = this.store.pipe(select(errorSelector))
      .subscribe((error) => {
        this.isError = error.isError
        this.error = error.error
        if (this.isError) {
          const errorMessage = this.error ? this.error.message
            : 'Something went wrong while saving product, please try again later or contact support'
          this.messageService.add({
            key: 'productUpdateToast',
            severity: 'error', summary: 'Error', detail: errorMessage, life: 3000
          });
        }
      })
  }
}
