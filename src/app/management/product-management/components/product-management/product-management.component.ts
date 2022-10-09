import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatestWith, filter, map, skip, Subscription } from "rxjs";
import { select, Store } from "@ngrx/store";
import { ConfirmationService, LazyLoadEvent, MessageService } from "primeng/api";
import { ActivatedRoute, ParamMap, Params, Router } from "@angular/router";

import { Product } from "src/app/management/domain/Product";
import { PageInterface } from "src/app/shared/types/page.interface";
import { ApiErrorInterface } from "src/app/shared/types/error/api-error.interface";
import { AppStateInterface } from "src/app/shared/types/app-state.interface";
import {
  errorSelector,
  isLoadingSelector,
  stateSelector
} from "src/app/management/product-management/store/product-get-all.selectors";
import { getProductsAction } from "src/app/management/product-management/store/actions/get-products.action";
import { CatalogHelpers } from "src/app/shared/helpers/catalog-helpers.class";
import { getDealersAction } from "src/app/shared/modules/dealers/store/get-dealers.action";
import { loadingDealersSliceSelector } from "src/app/shared/modules/dealers/store/selectors";
import { DealerInterface } from "src/app/shared/modules/identity/types/dealer.interface";
import { loadingCategoriesSliceSelector } from "src/app/shared/modules/categories/store/selectors";
import {
  SelectedDealerWithDealerListInterface
} from "src/app/management/product-management/types/selected-dealer-with-dealer-list.interface";
import {
  CommonHelpers,
  convertParamMapToParams,
  convertSortMetaToQueryString
} from "src/app/shared/helpers/common-helpers";
import { LoadingDealersSliceInterface } from "src/app/shared/modules/dealers/types/loading-dealers-slice.interface";
import {
  LoadingCategoriesSliceInterface
} from "src/app/shared/modules/categories/types/loading-categories-slice.interface";
import {
  SelectedCategoryIdWithCategoryListInterface
} from "src/app/management/product-management/types/selected-category-id-with-category-list.interface";
import { ErrorInterface } from "src/app/shared/types/error/error.interface";
import { deleteProductsAction } from "src/app/management/product-management/store/actions/delete-products.action";
import {
  deletionSelector,
  errorSelector as productDeleteErrorSelector,
  stateSelector as productDeleteStateSelector
} from "src/app/management/product-management/store/product-delete.selectors";
import { Category } from "src/app/management/domain/Category";
import { UserDetailsInterface } from "src/app/shared/modules/identity/types/user-details.interface";
import { identityStateSelector } from "src/app/shared/modules/identity/store/selectors";
import { IdentityStateInterface } from "src/app/shared/modules/identity/types/identity-state.interface";


// noinspection JSIgnoredPromiseFromCall
@Component({
  selector: 'ec-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit, OnDestroy {
  userSubscription: Subscription
  isLoadingSubscription: Subscription
  dataSubscription: Subscription
  errorSubscription: Subscription
  dealersSubscription: Subscription
  categoriesSubscription: Subscription
  queryParamMapSubscription: Subscription

  deletionSubscription: Subscription
  productDeleteStateSubscription: Subscription
  productDeleteErrorSubscription: Subscription

  emptyPage: PageInterface = {
    size: 10,
    totalElements: 0,
    totalPages: 0,
    number: 0
  }

  userDetails: UserDetailsInterface | null
  dealerId: number | null
  hasCreatePermission: boolean
  hasUpdatePermission: boolean
  hasDeletePermission: boolean
  dealerSelection: boolean

  isLoading: boolean
  products: Product[] | null
  page: PageInterface
  isError: boolean
  error: ApiErrorInterface | null

  dealerList: DealerInterface[]
  categoryList: Category[];

  queryParamMap: ParamMap | null

  selectedProducts: Product[]
  deletion: boolean

  suppressingLazyLoadingProducts: boolean

  productCreateDialog: boolean
  productEditDialog: boolean
  productEditProductId: number

  loading = () => this.isLoading || this.deletion

  getProductImageSrc = CatalogHelpers.getProductImageSrc
  getDefaultProductImage = CatalogHelpers.getDefaultProductImage
  parseInt = CommonHelpers.parseIntParameter

  filterByDealer: DealerInterface | null;
  filterBySku: string | null;
  filterByName: string | null;
  filterByCategory: Category | null;
  filterByMinUnitsInStock: number | null
  filterByMaxUnitsInStock: number | null
  multiSortMeta: { field: string; order: number } []

  constructor(private store: Store<AppStateInterface>,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private route: ActivatedRoute,
              private router: Router) {
    this.store.dispatch(getDealersAction())
  }

  ngOnInit(): void {
    this.initializeValues()
    this.initializeListeners()
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe()
    this.isLoadingSubscription.unsubscribe()
    this.dataSubscription.unsubscribe()
    this.errorSubscription.unsubscribe()
    this.dealersSubscription.unsubscribe()
    this.categoriesSubscription.unsubscribe()
    this.queryParamMapSubscription.unsubscribe()

    this.deletionSubscription.unsubscribe()
    this.productDeleteStateSubscription.unsubscribe()
    this.productDeleteErrorSubscription.unsubscribe()
  }

  private initializeValues(): void {
    this.suppressingLazyLoadingProducts = false
    this.products = [] as Product[]
    this.page = this.emptyPage
    this.dealerList = [] as DealerInterface[]
    this.categoryList = [] as Category[]
  }

  private initializeListeners(): void {
    this.subscribeToUser()
    this.subscribeToLoadingStatus()
    this.subscribeToData()
    this.subscribeToError()
    this.subscribeToDealers()
    this.subscribeToCategories()
    this.subscribeToQueryParamMap()

    this.subscribeToDeletionStatus()
    this.subscribeToProductDeleteState()
    this.subscribeToProductDeleteError()
  }

  private subscribeToUser(): void {
    this.userSubscription = this.store
      .pipe(select(identityStateSelector), filter(identityState =>
        !identityState.isLoading && identityState.isLoggedIn !== null
      ))
      .subscribe((identityState: IdentityStateInterface) => {
        this.userDetails = identityState.userDetails
        if (!this.userDetails) {
          return
        }
        if (this.userDetails.dealerRepresentative && this.userDetails.dealer !== null) {
          this.dealerId = this.userDetails.dealer.id
        }
        const dealerRepresentative: boolean =
          this.userDetails?.dealerRepresentative === true && this.userDetails.dealer !== null
        const authorities = this.userDetails.authorities
        this.hasCreatePermission = authorities.has('product.create') ||
          (authorities.has('dealer.product.create') && dealerRepresentative)
        this.hasUpdatePermission = authorities.has('product.update') ||
          (authorities.has('dealer.product.update') && dealerRepresentative)
        this.hasDeletePermission = authorities.has('product.delete') ||
          (authorities.has('dealer.product.delete') && dealerRepresentative)
        this.dealerSelection = authorities.has('product.create')
      })
  }

  private subscribeToLoadingStatus(): void {
    this.isLoadingSubscription = this.store.pipe(select(isLoadingSelector))
      .subscribe((isLoading: boolean) => {
        this.isLoading = isLoading
      })
  }

  private subscribeToData(): void {
    this.dataSubscription = this.store
      .pipe(select(stateSelector),
        skip(1),
        filter(state => !state.isLoading && !state.isError))
      .subscribe((state) => {
        if (state.page && state.page.number > 0 && state.page.number >= state.page.totalPages) {
          const params = convertParamMapToParams(state.paramMap)
          params['page'] = state.page.totalPages > 0 ? state.page.totalPages - 1 : 0
          this.router.navigate(['management/products'], { queryParams: params })
          return
        }
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
      })
  }

  private subscribeToError(): void {
    this.errorSubscription = this.store.pipe(select(errorSelector))
      .subscribe((error) => {
        this.handleError(error)
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
        return { dealer, dealers } as SelectedDealerWithDealerListInterface
      }))
      .subscribe((selectedDealerWithDealersList: SelectedDealerWithDealerListInterface) => {
        if (selectedDealerWithDealersList.dealers) {
          this.dealerList = selectedDealerWithDealersList.dealers
        }
        this.filterByDealer = selectedDealerWithDealersList.dealer
      })
  }

  private subscribeToCategories(): void {
    this.categoriesSubscription = this.store
      .pipe(select(loadingCategoriesSliceSelector),
        filter(slice => !slice.isLoading && slice.categories !== null))
      .pipe(combineLatestWith(
        this.route.queryParamMap.pipe(map((queryParamMap => queryParamMap.get('categoryId'))))))
      .pipe(map(([slice, id]: [LoadingCategoriesSliceInterface, string | null]) => {
        const categoryId = this.parseInt(id)
        const categories = slice.categories ? slice.categories.map(
          (category): Category => ({
            id: Number(category.id),
            name: category.name
          })) : null
        return { categoryId, categories } as SelectedCategoryIdWithCategoryListInterface
      }))
      .subscribe((next: SelectedCategoryIdWithCategoryListInterface) => {
        if (next.categories && this.categoryList.length === 0) {
          this.categoryList = next.categories.map((category => ({ ...category })))
        }
        const foundCategory = this.categoryList.find(category => category.id === next.categoryId)
        this.filterByCategory = foundCategory ? foundCategory : null
      })
  }

  private subscribeToQueryParamMap(): void {
    this.queryParamMapSubscription = this.route.queryParamMap
      .subscribe((queryParamMap) => {
        this.selectedProducts = []
        this.store.dispatch(getProductsAction({ params: queryParamMap }))
      })
  }

  private subscribeToDeletionStatus(): void {
    this.deletionSubscription = this.store.pipe(select(deletionSelector))
      .subscribe((deletion) => {
        this.deletion = deletion
      })
  }

  private subscribeToProductDeleteState() {
    this.productDeleteStateSubscription = this.store
      .pipe(select(productDeleteStateSelector), filter((
        state => !state.deletion && !state.isError && state.removedProductIds.length > 0)))
      .subscribe((state) => {
        const oneProductRemoved: boolean = state.removedProductIds.length === 1
        if (this.products) {
          if (oneProductRemoved) {
            this.products = this.products.filter(product => product.id !== state.removedProductIds[0])
          } else {
            this.products = this.products.filter(product => !state.removedProductIds.includes(product.id))
          }
        }
        this.selectedProducts = [];
        if (oneProductRemoved) {
          this.messageService.add({
            key: 'productsToast',
            severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000
          });
        } else {
          this.messageService.add({
            key: 'productsToast',
            severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000
          });
        }
        if (this.products?.length === 0) {
          this.onRefresh()
        }
      })
  }

  private subscribeToProductDeleteError() {
    this.productDeleteErrorSubscription = this.store
      .pipe(select(productDeleteErrorSelector), filter((error => error.isError)))
      .subscribe((error) => {
        const errorMessage = error.error ? error.error.message
          : 'Something went wrong while deleting products, please try again later or contact support'
        this.messageService.add({
          key: 'productsToast',
          severity: 'error', summary: 'Error', detail: errorMessage, life: 3000
        });
      })
  }

  onClearFilter(): void {
    this.clearDropDownFilterFields()
    this.clearNonDropDownFilterFields()
  }

  onSearch(): void {
    const currentParams: Params = this.convertParamMapToParamsExcludeRefreshKey()
    const size = currentParams['size']
    const sort = currentParams['sort']
    let params: Params = { page: 0 }
    params = size ? { ...params, size: size } : { ...params, size: this.emptyPage.size };
    if (sort) params = { ...params, sort: sort }
    if (this.filterByDealer) params = { ...params, dealerId: this.filterByDealer.id }
    if (this.filterBySku) params = { ...params, sku: this.filterBySku }
    if (this.filterByName) params = { ...params, name: this.filterByName }
    if (this.filterByCategory) params = { ...params, categoryId: this.filterByCategory.id }
    if (this.filterByMinUnitsInStock) params = { ...params, minUnitsInStock: this.filterByMinUnitsInStock }
    if (this.filterByMaxUnitsInStock) params = { ...params, maxUnitsInStock: this.filterByMaxUnitsInStock }
    params['refresh'] = +new Date()
    this.router.navigate(['management/products'], { queryParams: params })
  }

  onLazyLoadProducts($event: LazyLoadEvent) {
    if (this.suppressingLazyLoadingProducts) {
      this.suppressingLazyLoadingProducts = false
      return
    }
    let params: Params = convertParamMapToParams(this.queryParamMap, ['sort', 'refresh'])
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
      }
    }
    this.router.navigate(['management/products'], { queryParams: params })
  }

  onRefresh(): void {
    const params = this.convertParamMapToParamsExcludeRefreshKey()
    params['refresh'] = +new Date()
    this.router.navigate(['management/products'], { queryParams: params })
  }

  openNew(): void {
    this.productCreateDialog = true
  }

  onCreateProduct($event: Product | null): void {
    this.productCreateDialog = false
    if ($event) {
      const product: Product = this.getProductDeepCopy($event)
      if (this.products) {
        this.products = [product, ...this.products]
      } else {
        this.products = [product]
      }
    }
  }

  openEdit(product: Product): void {
    if (!product || product.id === undefined) {
      return
    }
    this.productEditProductId = product.id
    this.productEditDialog = true
  }

  onUpdateProduct($event: Product | null): void {
    this.productEditDialog = false
    if ($event) {
      const updatedProduct: Product = this.getProductDeepCopy($event)
      if (this.products && this.products.length > 0) {
        this.products = this.products.map(product => {
          if (product.id === updatedProduct.id) {
            return updatedProduct
          }
          return product
        })
      }
    }
  }

  deleteProduct(product: Product): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete [${product.sku}] - ${product.name}?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(deleteProductsAction({ ids: [product.id] }))
      }
    });
  }

  deleteSelectedProducts(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.selectedProducts && this.selectedProducts.length > 0) {
          const ids = this.selectedProducts.map((product => product.id))
          this.store.dispatch(deleteProductsAction({ ids }))
        }
      }
    });
  }

  private handleError(error: ErrorInterface): void {
    this.isError = error.isError
    this.error = error.error
    this.showLoadingProductsErrorToast()
  }

  private showLoadingProductsErrorToast(): void {
    if (this.isError) {
      const errorMessage = this.error ? this.error.message
        : 'Something went wrong while loading products, please try again later or contact support'
      this.messageService.add({
        key: 'productsToast',
        severity: 'error', summary: 'Error', detail: errorMessage, life: 3000
      });
    }
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

  private getProductDeepCopy(product: Product): Product {
    const result: Product = { ...product }
    if (product.category) {
      result.category = { ...product.category }
    }
    return result
  }
}
