import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { combineLatest, filter, map, Observable, Subscription } from "rxjs";
import { ActivatedRoute, NavigationEnd, ParamMap, Params, Router } from "@angular/router";
import { ViewportScroller } from "@angular/common";

import {
  errorSelector,
  isLoadingSelector,
  layoutSettingsSelector,
  pageSettingsSelector,
  productListDataSelector
} from "src/app/catalog/product-list/store/selectors";
import { AppStateInterface } from "src/app/shared/types/app-state.interface";
import { ProductInterface } from "src/app/shared/types/catalog/product.interface";
import { PageInterface } from "src/app/shared/types/page.interface";
import { getProductListAction } from "src/app/catalog/product-list/store/actions/get-product-list.action";
import { InventoryStatusEnum } from "src/app/shared/types/catalog/inventory-status.enum";
import { CatalogHelpers } from "src/app/shared/helpers/catalog-helpers.class";
import { CommonHelperClass } from "src/app/shared/helpers/common-helper.class";
import { environment } from "src/environments/environment";
import {
  setProductListPageSettingsAction
} from "src/app/catalog/product-list/store/actions/set-product-list-page-settings.action";
import { ProductListDataInterface } from "src/app/catalog/product-list/types/product-list-data.interface";
import {
  getProductListPageSettingsAction
} from "src/app/catalog/product-list/store/actions/get-product-list-page-settings.action";
import {
  ProductListPageSettingsStateInterface
} from "src/app/catalog/product-list/types/product-list-page-settings-state.interface";
import {
  getProductListLayoutSettingsAction
} from "src/app/catalog/product-list/store/actions/get-product-list-layout-settings.action";
import {
  setProductListLayoutSettingsAction
} from "src/app/catalog/product-list/store/actions/set-product-list-layout-settings.action";
import {
  ProductListLayoutSettingsStateInterface
} from "src/app/catalog/product-list/types/product-list-layout-settings-state.interface";


// noinspection JSIgnoredPromiseFromCall
@Component({
  selector: 'ec-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>
  error$: Observable<string | null>
  conditionSubscription: Subscription
  productsDataSubscription: Subscription
  layoutSettingsSubscription: Subscription
  queryParamMapSubscription: Subscription
  navigationEndSubscription: Subscription
  products: ProductInterface[] | null
  page: PageInterface | null

  pageSizeList: number[]
  pageSize: number
  layout: string

  searchText: string

  getProductImageSrc = CatalogHelpers.getProductImageSrc
  getDefaultProductImage = CatalogHelpers.getDefaultProductImage
  getNumberOfRatingStars = CatalogHelpers.getNumberOfRatingStars

  constructor(private store: Store<AppStateInterface>,
              private router: Router,
              private route: ActivatedRoute,
              private viewPortScroller: ViewportScroller) {
    this.subscribeToNavigationEnd()
  }

  public getInventoryStatusTypes(): typeof InventoryStatusEnum {
    return InventoryStatusEnum;
  }

  public getHTMLInputElementValue(target: EventTarget | null): string {
    return EventTarget ? (target as HTMLInputElement).value : ''
  }

  onPageSizeChange(value: number): void {
    if (this.pageSize === value) {
      return
    }
    const routeSizeParam = this.route.snapshot.queryParamMap.get('size')
    if (routeSizeParam !== null && parseInt(routeSizeParam) !== value) {
      const queryParams: Params = {
        ...this.route.snapshot.queryParams,
        page: '1',
        size: `${value}`
      }
      const url = this.route.snapshot.url.map((element) => element.path).join('/')
      this.router.navigate([url], { queryParams: queryParams })
      return
    }
    this.setPageSize(value)
  }

  onChangeLayout($event: Event): void {
    const layout = ($event as any).layout
    this.setLayout(layout)
  }

  onSearchByName(): void {
    let queryParams: Params = { ...this.route.snapshot.queryParams }
    if (this.searchText.trim().length > 0) {
      queryParams = { ...queryParams, name: this.searchText }
    } else {
      delete queryParams['name']
    }
    const hasParams = Object.keys(queryParams).length > 0
    if (hasParams && queryParams.hasOwnProperty('page')) {
      queryParams = { ...queryParams, page: '1', size: `${this.pageSize}` }
    }
    let segments = this.route.snapshot.url.map((element) => element.path)
    const currentLastSegmentIsSearch = segments[segments.length - 1] === 'search'
    if (hasParams && !currentLastSegmentIsSearch) {
      segments.push('search')
    }
    if (!hasParams && currentLastSegmentIsSearch) {
      segments.pop()
    }
    const url = segments.join('/')
    if (hasParams) {
      this.router.navigate([url], { queryParams: queryParams })
      return
    }
    this.router.navigateByUrl(url)
  }

  onPage($event: any): void {
    let first = 0
    let rows = this.pageSize
    if ($event.first !== undefined && $event.first !== null && parseInt($event.first) >= 0) {
      first = parseInt($event.first)
    }
    if ($event.rows !== undefined && $event.rows !== null && parseInt($event.rows) > 0) {
      rows = parseInt($event.rows)
    }
    const pageNumber: number = first / rows + 1
    let queryParams: Params = { ...this.route.snapshot.queryParams }
    const currentQueryParamsPage = parseInt(queryParams['page'])
    const currentPage: number = currentQueryParamsPage > 1 ? currentQueryParamsPage : 1
    if (pageNumber === currentPage) {
      return
    }
    queryParams = {
      ...queryParams,
      page: `${pageNumber}`,
      size: `${rows}`
    }
    let segments = this.route.snapshot.url.map((element) => element.path)
    if (segments[segments.length - 1] !== 'search') {
      segments.push('search')
    }
    const url = segments.join('/')
    this.router.navigate([url], { queryParams: queryParams })
  }

  ngOnInit(): void {
    this.initializeValues()
    this.initializeSettings()
    this.initializeListeners()
  }

  ngOnDestroy(): void {
    this.productsDataSubscription.unsubscribe()
    this.layoutSettingsSubscription.unsubscribe()
    this.conditionSubscription.unsubscribe()
    this.queryParamMapSubscription.unsubscribe()
    this.navigationEndSubscription.unsubscribe()
  }

  private initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
    this.searchText = ''
  }

  private initializeSettings(): void {
    this.pageSizeList = environment.pageSizeList
    this.store.dispatch(getProductListPageSettingsAction())
    this.store.dispatch(getProductListLayoutSettingsAction())
  }

  private initializeListeners(): void {
    this.subscribeToProductsData()
    this.subscribeToLayoutSettings()
    this.subscribeToChangeConditions()
    this.subscribeToQueryParamMap()
  }

  private subscribeToProductsData(): void {
    this.productsDataSubscription = this.store.pipe(select(productListDataSelector))
      .subscribe((productsData: ProductListDataInterface | null) => {
        if (productsData) {
          this.products = productsData.products
          this.page = productsData.page
        } else {
          this.products = this.page = null
        }
      })
  }

  private subscribeToLayoutSettings(): void {
    this.layoutSettingsSubscription = this.store.pipe(select(layoutSettingsSelector))
      .subscribe((layoutSettings: ProductListLayoutSettingsStateInterface | null) => {
        if (layoutSettings === null || layoutSettings.isLoading) {
          return
        }
        if (layoutSettings.layout === 'grid' || layoutSettings.layout === 'list') {
          if (this.layout != layoutSettings.layout) {
            this.layout = layoutSettings.layout
          }
          return;
        }
        this.setLayout('grid')
      })
  }

  private subscribeToChangeConditions(): void {
    this.conditionSubscription = combineLatest([
        this.store.pipe(select(pageSettingsSelector)),
        this.route.paramMap,
        this.route.queryParamMap
      ]
    ).pipe(map(([pageSettings, paramMap, queryParamMap]:
                  [ProductListPageSettingsStateInterface | null, ParamMap, ParamMap]) => {
      return { pageSettings, paramMap, queryParamMap }
    })).subscribe(({ pageSettings, paramMap, queryParamMap }) => {
      if (pageSettings === null || pageSettings.isLoading) {
        return;
      }
      const paramPageSize = CommonHelperClass.parseIntParameter(queryParamMap.get('size'))
      if (pageSettings.size && !paramPageSize) {
        if (this.pageSize !== pageSettings.size) {
          this.pageSize = pageSettings.size
        }
      }
      if (pageSettings.size && paramPageSize && pageSettings.size === paramPageSize) {
        if (this.pageSize !== pageSettings.size) {
          this.pageSize = pageSettings.size
        }
      }
      if (paramPageSize && this.pageSize !== paramPageSize) {
        this.setPageSize(paramPageSize)
        return;
      }
      if (pageSettings.size === null && !pageSettings.failure) {
        this.store.dispatch(getProductListPageSettingsAction())
        return;
      }
      if (pageSettings.size === null && pageSettings.failure) {
        this.setPageSize(this.pageSizeList[environment.defaultPageSizeIndex])
        return;
      }
      const name = queryParamMap.get('name')
      let categoryId: number | null = null
      if (this.route.snapshot.url[0].path === 'category') {
        categoryId = CommonHelperClass.parseIntParameter(paramMap.get('categoryId'))
      }
      let page: number | null = CommonHelperClass.parseIntParameter(queryParamMap.get('page'))
      if (page !== null) {
        page = page - 1
      }
      this.store.dispatch(getProductListAction({
        params: {
          name,
          categoryId,
          page,
          size: this.pageSize
        }
      }))
    })
  }

  private subscribeToQueryParamMap(): void {
    this.queryParamMapSubscription = this.route.queryParamMap.subscribe(
      (queryParamMap: ParamMap) => {
        const nameQueryParameter = queryParamMap.get('name')
        this.searchText = nameQueryParameter ? nameQueryParameter : ''
      })
  }

  private subscribeToNavigationEnd(): void {
    this.navigationEndSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
          this.viewPortScroller.scrollToPosition([0, 0])
        }
      )
  }

  private setPageSize(size: number): void {
    if (this.pageSize !== size) {
      this.pageSize = size
      this.store.dispatch(setProductListPageSettingsAction({ pageSettings: { size } }))
    }
  }

  private setLayout(layout: string): void {
    if (this.layout !== layout) {
      this.layout = layout
      this.store.dispatch(setProductListLayoutSettingsAction({ layoutSettings: { layout } }))
    }
  }
}
