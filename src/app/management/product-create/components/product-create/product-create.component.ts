import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CatalogHelpers } from "src/app/shared/helpers/catalog-helpers.class";
import { select, Store } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/types/app-state.interface";
import { DealerInterface } from "src/app/shared/modules/identity/types/dealer.interface";
import { Category } from "src/app/management/domain/Category";
import { ProductCreateInputInterface } from "src/app/management/product-create/types/product-create-input.interface";
import { Product } from "src/app/management/domain/Product";
import { filter, map, skip, Subscription } from "rxjs";
import { loadingDealersSliceSelector } from "src/app/shared/modules/dealers/store/selectors";
import { LoadingDealersSliceInterface } from "src/app/shared/modules/dealers/types/loading-dealers-slice.interface";
import { loadingCategoriesSliceSelector } from "src/app/shared/modules/categories/store/selectors";
import { CommonHelpers } from "src/app/shared/helpers/common-helpers";
import { getDealersAction } from "src/app/shared/modules/dealers/store/get-dealers.action";
import { createProductAction } from "src/app/management/product-create/store/create-product.action";
import { ProductCreateModelInterface } from "src/app/management/product-create/types/product-create-model.interface";
import { errorSelector, stateSelector } from "src/app/management/product-create/store/selectors";
import { ApiErrorInterface } from "src/app/shared/types/error/api-error.interface";
import { MessageService } from "primeng/api";


@Component({
  selector: 'ec-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit, OnDestroy {
  @Input("dealerId") dealerIdProps: number | null | undefined
  @Input("dealerSelection") dealerSelectionProps: boolean
  @Output("createProduct") productCreateEvent = new EventEmitter<Product | null>()

  dealersSubscription: Subscription
  categoriesSubscription: Subscription
  createdProductSubscription: Subscription
  errorSubscription: Subscription

  productInput: ProductCreateInputInterface

  dealerList: DealerInterface[]
  categoryList: Category[];

  isError: boolean
  error: ApiErrorInterface | null

  submitted: boolean

  getProductImageSrc = CatalogHelpers.getProductImageSrc
  getDefaultProductImage = CatalogHelpers.getDefaultProductImage
  parseInt = CommonHelpers.parseIntParameter

  constructor(private store: Store<AppStateInterface>, private messageService: MessageService) {
    this.store.dispatch(getDealersAction())
  }

  ngOnInit(): void {
    this.initializeValues()
    this.initializeListeners()
  }

  private initializeValues(): void {
    this.submitted = false
    this.dealerList = []
    this.categoryList = []
    this.initializeInput()
  }

  private initializeListeners() {
    if (this.dealerSelectionProps) {
      this.subscribeToDealers()
    }
    this.subscribeToCategories()
    this.subscribeToCreatedProduct()
    this.subscribeToError()
  }

  ngOnDestroy(): void {
    if (this.dealerSelectionProps) {
      this.dealersSubscription.unsubscribe()
    }
    this.categoriesSubscription.unsubscribe()
    this.createdProductSubscription.unsubscribe()
    this.errorSubscription.unsubscribe()
  }

  hideDialog() {
    this.productCreateEvent.emit(null)
  }

  saveProduct() {
    this.submitted = true
    const dealerId = this.productInput.dealerId !== null ? this.productInput.dealerId : this.productInput.dealer?.id
    if (dealerId === undefined ||
      this.productInput.sku === null ||
      !this.productInput.category ||
      this.productInput.name === null ||
      this.productInput.unitsInStock === null
    ) {
      return
    }
    const productCreateModel: ProductCreateModelInterface = {
      dealerId: dealerId,
      sku: this.productInput.sku,
      categoryId: this.productInput.category.id,
      name: this.productInput.name,
      description: this.productInput.description,
      image: this.productInput.image,
      active: true,
      unitsInStock: this.productInput.unitsInStock,
      unitPrice: this.productInput.unitPrice
    }
    this.store.dispatch(createProductAction({ productCreateModel }))
  }

  private initializeInput(): void {
    this.productInput = {
      dealerId: this.dealerIdProps !== undefined ? this.dealerIdProps : null,
      dealer: null,
      sku: null,
      category: null,
      name: null,
      description: null,
      image: null,
      unitsInStock: 0,
      unitPrice: null
    }
  }

  private subscribeToDealers(): void {
    this.dealersSubscription = this.store
      .pipe(select(loadingDealersSliceSelector),
        filter(slice => !slice.isLoading && slice.dealers !== null))
      .subscribe((slice: LoadingDealersSliceInterface) => {
        if (slice.dealers) {
          this.dealerList = slice.dealers
        }
        this.setInitialDropDownDealer()
      })
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
        }
      })
  }

  private subscribeToCreatedProduct(): void {
    this.createdProductSubscription = this.store
      .pipe(select(stateSelector),
        skip(1),
        filter(state => !state.isLoading && !state.isError && state.product !== null))
      .pipe(map(state => state.product))
      .subscribe((product) => {
        this.productCreateEvent.emit(product)
      })
  }

  private subscribeToError(): void {
    this.errorSubscription = this.store.pipe(select(errorSelector))
      .subscribe((error) => {
        this.isError = error.isError
        this.error = error.error
        if (this.isError) {
          const errorMessage = this.error ? this.error.message
            : 'Something went wrong while creation product, please try again later or contact support'
          this.messageService.add({
            key: 'productCreateToast',
            severity: 'error', summary: 'Error', detail: errorMessage, life: 3000
          });
        }
      })
  }

  private setInitialDropDownDealer(): void {
    if (this.dealerList && this.dealerList.length > 0) {
      const foundDealer = this.dealerList.find(dealer => dealer.id === this.dealerIdProps)
      this.productInput.dealer = foundDealer ? foundDealer : null
    }
  }
}
