import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { select, Store } from "@ngrx/store";
import { LazyLoadEvent, MessageService, SortMeta } from "primeng/api";
import { ActivatedRoute, ParamMap, Params, Router } from "@angular/router";

import { Product } from "src/app/management/domain/Product";
import { PageInterface } from "src/app/shared/types/page.interface";
import { ApiErrorInterface } from "src/app/shared/types/error/api-error.interface";
import { AppStateInterface } from "src/app/shared/types/app-state.interface";
import { dataSelector, errorSelector, isLoadingSelector } from "src/app/management/product-management/store/selectors";
import { ProductGetAllDataInterface } from "src/app/management/product-management/types/product-get-all-data.interface";
import { getProductsAction } from "src/app/management/product-management/store/actions/get-products.action";
import { CatalogHelpers } from "src/app/shared/helpers/catalog-helpers.class";
import { getDealersAction } from "src/app/shared/modules/dealers/store/get-dealers.action";
import { dealersSelector } from "src/app/shared/modules/dealers/store/selectors";
import { DealerInterface } from "src/app/shared/modules/identity/types/dealer.interface";
import { ProductCategoryInterface } from "src/app/shared/types/catalog/product-category.interface";
import { categoriesSelector } from "src/app/shared/modules/categories/store/selectors";


// noinspection JSIgnoredPromiseFromCall
@Component({
  selector: 'ec-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit, OnDestroy {
  isLoadingSubscription: Subscription
  dataSubscription: Subscription
  errorSubscription: Subscription
  dealersSubscription: Subscription
  categoriesSubscription: Subscription
  queryParamMapSubscription: Subscription

  emptyPage: PageInterface = {
    size: 10,
    totalElements: 0,
    totalPages: 0,
    number: 0
  }

  isLoading: boolean
  products: Product[] | null
  page: PageInterface
  isError: boolean
  error: ApiErrorInterface | null

  dealerList: DealerInterface[]
  categoryList: ProductCategoryInterface[];

  queryParamMap: ParamMap

  selectedProducts: Product[]

  getProductImageSrc = CatalogHelpers.getProductImageSrc
  getDefaultProductImage = CatalogHelpers.getDefaultProductImage

  filterByDealer: DealerInterface | null;
  filterBySku: string | null;
  filterByName: string | null;
  filterByCategory: ProductCategoryInterface | null;
  filterByMinUnitsInStock: number | null
  filterByMaxUnitsInStock: number | null
  multiSortMeta: { field: string; order: number } []

  constructor(private store: Store<AppStateInterface>,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private router: Router) {
    this.store.dispatch(getDealersAction())
  }

  ngOnInit(): void {
    this.initializeValues()
    this.initializeListeners()
  }

  ngOnDestroy(): void {
    this.isLoadingSubscription.unsubscribe()
    this.dataSubscription.unsubscribe()
    this.errorSubscription.unsubscribe()
    this.dealersSubscription.unsubscribe()
    this.categoriesSubscription.unsubscribe()
    this.queryParamMapSubscription.unsubscribe()
  }

  private initializeValues() {
    this.multiSortMeta = []
  }

  private initializeListeners(): void {
    this.subscribeToLoadingStatus()
    this.subscribeToData()
    this.subscribeToError()
    this.subscribeToDealers()
    this.subscribeToCategories()
    this.subscribeToQueryParamMap()
  }

  private subscribeToLoadingStatus(): void {
    this.isLoadingSubscription = this.store.pipe(select(isLoadingSelector))
      .subscribe((isLoading: boolean) => {
        this.isLoading = isLoading
      })
  }

  private subscribeToData(): void {
    this.dataSubscription = this.store.pipe(select(dataSelector))
      .subscribe((data: ProductGetAllDataInterface) => {
        if (data.products) {
          this.products = data.products
        } else {
          this.products = [] as Product[]
        }
        if (data.page) {
          this.page = data.page
        } else {
          this.page = this.emptyPage
        }
      })
  }

  private subscribeToError(): void {
    this.errorSubscription = this.store.pipe(select(errorSelector))
      .subscribe((error) => {
        this.isError = error.isError
        this.error = error.error
        this.showErrorToast()
      })
  }

  private subscribeToDealers(): void {
    this.dealersSubscription = this.store.pipe(select(dealersSelector))
      .subscribe((dealers) => {
        if (dealers) {
          this.dealerList = dealers
        } else {
          this.dealerList = [] as DealerInterface[]
        }
      })
  }

  private subscribeToCategories(): void {
    this.categoriesSubscription = this.store.pipe(select(categoriesSelector))
      .subscribe((categories) => {
        if (categories) {
          this.categoryList = categories
        } else {
          this.categoryList = [] as ProductCategoryInterface[]
        }
      })
  }

  private subscribeToQueryParamMap(): void {
    this.queryParamMapSubscription = this.route.queryParamMap
      .subscribe((queryParamMap) => {
        this.selectedProducts = []
        this.queryParamMap = queryParamMap
        this.store.dispatch(getProductsAction({ params: queryParamMap }))
      })
  }

  private showErrorToast(): void {
    if (this.isError) {
      const errorMessage = this.error ? this.error.message
        : 'Something went wrong while loading products, please try again later or contact support'
      this.messageService.add({
        key: 'productsToast',
        severity: 'error',
        summary: 'Error',
        detail: errorMessage,
        life: 3000
      });
    }
  }

  onClearFilter(): void {
    this.filterByDealer = null
    this.filterBySku = null
    this.filterByName = null
    this.filterByCategory = null
    this.filterByMinUnitsInStock = null
    this.filterByMaxUnitsInStock = null
  }

  onSearch(): void {
    const currentParams: Params = this.convertParamMapToParams(this.queryParamMap)
    const page = currentParams['page']
    const sort = currentParams['sort']
    let params: Params = {}
    if (page) {
      params = { ...params, page: page }
    }
    if (sort) {
      params = { ...params, sort: sort }
    }
    console.log(params)
    if (this.filterByDealer) params = { ...params, dealerId: this.filterByDealer.id }
    if (this.filterBySku) params = { ...params, sku: this.filterBySku }
    if (this.filterByName) params = { ...params, name: this.filterByName }
    if (this.filterByCategory) params = { ...params, categoryId: this.filterByCategory.id }
    if (this.filterByMinUnitsInStock) params = { ...params, minUnitsInStock: this.filterByMinUnitsInStock }
    if (this.filterByMaxUnitsInStock) params = { ...params, maxUnitsInStock: this.filterByMaxUnitsInStock }
    this.router.navigate(['management/products'], { queryParams: params })
  }

  onLazyLoadProducts($event: LazyLoadEvent) {
    let params: Params = this.convertParamMapToParams(this.queryParamMap)
    if ($event.first !== undefined && $event.rows !== undefined) {
      const page = $event.first / $event.rows
      params = { ...params, page: page, size: $event.rows }
    }
    if ($event.multiSortMeta !== undefined) {
      if ($event.multiSortMeta.length > 1) {
        params = { ...params, sort: [] }
        for (const sort of $event.multiSortMeta) {
          (params['sort'] as string[]).push(this.convertSortMetaToQueryString(sort))
        }
      } else if ($event.multiSortMeta.length === 1) {
        params = { ...params, sort: this.convertSortMetaToQueryString($event.multiSortMeta[0]) }
      } else {
        params = { ...params, sort: 'id' }
      }
    }
    this.router.navigate(['management/products'], { queryParams: params })
  }

  onRefresh(): void {
    this.router.navigate(['management/products'],
      { queryParams: this.convertParamMapToParams(this.queryParamMap) })
  }

  openNew(): void {

  }

  editProduct(product: any): void {

  }

  deleteProduct(product: any): void {

  }

  deleteSelectedProducts(): void {

  }

  private convertParamMapToParams(paramMap: ParamMap): Params {
    let params: Params = {}
    for (const key of this.queryParamMap.keys) {
      if (this.queryParamMap.getAll(key).length > 1) {
        params = { ...params, [key]: this.queryParamMap.getAll(key) }
      } else {
        params = { ...params, [key]: this.queryParamMap.get(key) }
      }
    }
    return params
  }

  private convertSortMetaToQueryString(sortMeta: SortMeta): string {
    if (sortMeta.order < 0) {
      return sortMeta.field + ',desc'
    }
    return sortMeta.field
  }

}
