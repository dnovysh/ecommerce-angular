import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { combineLatest, map, Observable, Subscription } from "rxjs";
import { ActivatedRoute, ParamMap } from "@angular/router";

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
  products: ProductInterface[] | null
  page: PageInterface | null

  pageSizeList: number[]
  pageSize: number
  layout: string

  getProductImageSrc = CatalogHelpers.getProductImageSrc
  getDefaultProductImage = CatalogHelpers.getDefaultProductImage
  getNumberOfRatingStars = CatalogHelpers.getNumberOfRatingStars

  constructor(private store: Store<AppStateInterface>,
              private route: ActivatedRoute) { }

  public getInventoryStatusTypes(): typeof InventoryStatusEnum {
    return InventoryStatusEnum;
  }

  public getHTMLInputElementValue(target: EventTarget | null): string {
    return EventTarget ? (target as HTMLInputElement).value : ''
  }

  public onPageSizeChange(value: number) {
    this.setPageSize(value)
  }

  public onChangeLayout($event: Event) {
    const layout = ($event as any).layout
    this.setLayout(layout)
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
  }

  private initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
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
      return { pageSettings, paramMap, queryParamMap}
    })).subscribe(({ pageSettings, paramMap,  queryParamMap}) => {
      if (pageSettings === null || pageSettings.isLoading) {
        return;
      }
      if (pageSettings.size) {
        if (this.pageSize !== pageSettings.size) {
          this.pageSize = pageSettings.size
        }
      }
      const paramPageSize = CommonHelperClass.parseIntParameter(paramMap.get('pageSize'))
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
      this.store.dispatch(getProductListAction({
        params: {
          name,
          categoryId,
          size: this.pageSize
        }
      }))
    })
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
