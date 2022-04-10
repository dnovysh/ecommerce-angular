import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable, Subscription} from "rxjs";

import {
  errorSelector,
  isLoadingSelector,
  pageSelector,
  productListSelector
} from "src/app/catalog/product-list/store/selectors";
import {AppStateInterface} from "src/app/shared/types/app-state.interface";
import {ProductInterface} from "src/app/shared/types/catalog/product.interface";
import {PageInterface} from "src/app/shared/types/page.interface";
import {getProductListAction} from "src/app/catalog/product-list/store/actions/get-product-list.action";
import {InventoryStatusEnum} from "src/app/shared/types/catalog/inventory-status.enum";
import {CatalogHelpers} from "src/app/shared/helpers/catalog-helpers.class";


@Component({
  selector: 'ec-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>
  error$: Observable<string | null>
  productsSubscription: Subscription
  pageSubscription: Subscription
  products: ProductInterface[] | null
  page: PageInterface | null
  limit: number = 12

  constructor(
    private store: Store<AppStateInterface>) {
  }

  ngOnInit(): void {
    this.initializeValues()
    this.initializeListeners()
    this.fetchData()
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe()
    this.pageSubscription.unsubscribe()
  }

  public getInventoryStatusTypes(): typeof InventoryStatusEnum {
    return InventoryStatusEnum;
  }

  private initializeValues() {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
  }

  private initializeListeners() {
    this.productsSubscription = this.store
      .pipe(select(productListSelector))
      .subscribe((products: ProductInterface[] | null) =>
        this.products = CatalogHelpers.getProductsWithCalculatedInventoryStatus(products)
      )
    this.pageSubscription = this.store
      .pipe(select(pageSelector))
      .subscribe((page: PageInterface | null) => {
        this.page = page
      })
  }

  private fetchData(): void {
    this.store.dispatch(getProductListAction())
  }
}
