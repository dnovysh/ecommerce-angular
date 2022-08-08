import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatestWith, filter, map, Subscription } from "rxjs";
import { select, Store } from "@ngrx/store";
import { LazyLoadEvent, MessageService } from "primeng/api";
import { ActivatedRoute, ParamMap, Params, Router } from "@angular/router";

import { Product } from "src/app/management/domain/Product";
import { PageInterface } from "src/app/shared/types/page.interface";
import { ApiErrorInterface } from "src/app/shared/types/error/api-error.interface";
import { AppStateInterface } from "src/app/shared/types/app-state.interface";
import { errorSelector, isLoadingSelector, stateSelector } from "src/app/management/product-management/store/selectors";
import { getProductsAction } from "src/app/management/product-management/store/actions/get-products.action";
import { CatalogHelpers } from "src/app/shared/helpers/catalog-helpers.class";
import { getDealersAction } from "src/app/shared/modules/dealers/store/get-dealers.action";
import { loadingDealersSliceSelector } from "src/app/shared/modules/dealers/store/selectors";
import { DealerInterface } from "src/app/shared/modules/identity/types/dealer.interface";
import { ProductCategoryInterface } from "src/app/shared/types/catalog/product-category.interface";
import { categoriesSelector } from "src/app/shared/modules/categories/store/selectors";
import {
  SelectedDealerWithDealersListInterface
} from "src/app/management/product-management/types/selected-dealer-with-dealers-list.interface";
import {
  CommonHelpers,
  convertParamMapToParams,
  convertSortMetaToQueryString
} from "src/app/shared/helpers/common-helpers";
import { LoadingDealersSliceInterface } from "src/app/shared/modules/dealers/types/loading-dealers-slice.interface";


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

  queryParamMap: ParamMap | null

  selectedProducts: Product[]

  suppressingLazyLoadingProducts: boolean

  getProductImageSrc = CatalogHelpers.getProductImageSrc
  getDefaultProductImage = CatalogHelpers.getDefaultProductImage
  parseInt = CommonHelpers.parseIntParameter

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
    this.suppressingLazyLoadingProducts = false
    this.products = [] as Product[]
    this.dealerList = [] as DealerInterface[]
    this.categoryList = [] as ProductCategoryInterface[]
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
    this.dataSubscription = this.store
      .pipe(select(stateSelector), filter(state => !state.isLoading && !state.isError))
      .subscribe((state) => {
        this.suppressingLazyLoadingProducts = true
        this.queryParamMap = state.paramMap
        this.clearNonDropDownFilterFields()
        if (this.queryParamMap) {
          this.filterBySku = this.queryParamMap.get('sku')
          this.filterByName = this.queryParamMap.get('name')
          const minUnitsInStock = this.queryParamMap.get('minUnitsInStock')
          this.filterByMinUnitsInStock = minUnitsInStock ? Number(minUnitsInStock) : null
          const maxUnitsInStock = this.queryParamMap.get('maxUnitsInStock')
          this.filterByMaxUnitsInStock = maxUnitsInStock ? Number(maxUnitsInStock) : null
        }
        this.multiSortMeta = []
        if (this.queryParamMap?.has('sort')) {
          for (const sort of this.queryParamMap.getAll('sort')) {
            const sortSplit = sort.split(',')
            const field = sortSplit[0]
            const sortOrder = (sortSplit.length === 2 && sortSplit[1].toLowerCase() === 'desc') ? -1 : 1
            this.multiSortMeta.push({ field: field, order: sortOrder })
          }
        }
        if (state.products) {
          this.products = state.products
        } else {
          this.products = [] as Product[]
        }
        if (state.page) {
          this.page = state.page
        } else {
          this.page = this.emptyPage
        }


        console.log('data subscription')
        console.log(this.products)


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
    this.dealersSubscription = this.store
      .pipe(select(loadingDealersSliceSelector),
        filter(slice => !slice.isLoading && slice.dealers !== null))
      .pipe(combineLatestWith(
        this.route.queryParamMap.pipe(map((queryParamMap => queryParamMap.get('dealerId'))))))
      .pipe(map(([slice, dealerId]: [LoadingDealersSliceInterface, string | null]) => {
        const foundDealer = slice.dealers?.find(dealer => dealer.id === this.parseInt(dealerId))
        const dealer = foundDealer ? foundDealer : null
        const dealers = slice.dealers
        return { dealer, dealers } as SelectedDealerWithDealersListInterface
      }))
      .subscribe((selectedDealerWithDealersList: SelectedDealerWithDealersListInterface) => {
        if (selectedDealerWithDealersList.dealers) {
          this.dealerList = selectedDealerWithDealersList.dealers
        }
        this.filterByDealer = selectedDealerWithDealersList.dealer
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
    this.clearDropDownFilterFields()
    this.clearNonDropDownFilterFields()
  }

  onSearch(): void {
    const currentParams: Params = this.convertParamMapToParamsExcludeRefreshKey()
    const page = currentParams['page']
    const size = currentParams['size']
    const sort = currentParams['sort']
    let params: Params = {}
    if (page) params = { ...params, page: page }
    if (size) params = { ...params, size: size }
    if (sort) params = { ...params, sort: sort }
    if (this.filterByDealer) params = { ...params, dealerId: this.filterByDealer.id }
    if (this.filterBySku) params = { ...params, sku: this.filterBySku }
    if (this.filterByName) params = { ...params, name: this.filterByName }
    if (this.filterByCategory) params = { ...params, categoryId: this.filterByCategory.id }
    if (this.filterByMinUnitsInStock) params = { ...params, minUnitsInStock: this.filterByMinUnitsInStock }
    if (this.filterByMaxUnitsInStock) params = { ...params, maxUnitsInStock: this.filterByMaxUnitsInStock }
    this.router.navigate(['management/products'], { queryParams: params })
  }

  onLazyLoadProducts($event: LazyLoadEvent) {

    if (this.suppressingLazyLoadingProducts) {
      console.log('onLazyLoadProducts return')
      this.suppressingLazyLoadingProducts = false
      return
    }

    let params: Params = this.convertParamMapToParamsExcludeRefreshKey()
    if ($event.first !== undefined && $event.rows !== undefined) {
      const page = $event.first / $event.rows
      params = { ...params, page: page, size: $event.rows }
    }
    if ($event.multiSortMeta !== undefined) {
      if ($event.multiSortMeta.length > 1) {
        params = { ...params, sort: [] }
        for (const sort of $event.multiSortMeta) {
          (params['sort'] as string[]).push(convertSortMetaToQueryString(sort))
        }
      } else if ($event.multiSortMeta.length === 1) {
        params = { ...params, sort: convertSortMetaToQueryString($event.multiSortMeta[0]) }
      } else {
        params = { ...params, sort: 'id' }
      }
    }

    console.log('onLazyLoadProducts navigate')

    this.router.navigate(['management/products'], { queryParams: params })
  }

  onRefresh(): void {
    const params = this.convertParamMapToParamsExcludeRefreshKey()
    params['refresh'] = +new Date()
    this.router.navigate(['management/products'], { queryParams: params })
  }

  openNew(): void {

  }

  editProduct(product: any): void {

  }

  deleteProduct(product: any): void {

  }

  deleteSelectedProducts(): void {

  }

  private clearDropDownFilterFields(): void {
    this.filterByDealer = null
    this.filterByCategory = null
  }

  private clearNonDropDownFilterFields(): void {
    this.filterBySku = null
    this.filterByName = null
    this.filterByMinUnitsInStock = null
    this.filterByMaxUnitsInStock = null
  }

  private convertParamMapToParamsExcludeRefreshKey(): Params {
    return convertParamMapToParams(this.queryParamMap, ['refresh'])
  }

}
