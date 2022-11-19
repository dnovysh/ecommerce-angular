import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from "@angular/common/http";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { EntityDataModule } from "@ngrx/data";
import { routerReducer, StoreRouterConnectingModule } from "@ngrx/router-store";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from "primeng/api";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListModule } from "src/app/catalog/product-list/product-list.module";
import { LoadingModule } from "src/app/shared/modules/loading/loading.module";
import { environment } from "src/environments/environment";
import { AppFooterModule } from "src/app/shared/modules/app-footer/app-footer.module";
import { AppNavbarModule } from "src/app/shared/modules/app-navbar/app-navbar.module";
import { CategoriesModule } from "src/app/shared/modules/categories/categories.module";
import { IdentityModule } from "src/app/shared/modules/identity/identity.module";
import { AuthModule } from "src/app/auth/auth.module";
import { HttpXsrfInterceptor } from "src/app/shared/interceptors/http-xsrf.interceptor";
import { SupportModule } from "src/app/general/support/support.module";
import { ProfileSettingsModule } from "src/app/profile/profile-settings/profile-settings.module";
import {
  AuthorityGroupingReportModule
} from "src/app/admin/authority-grouping-report/authority-grouping-report.module";
import { RoleAdministrationModule } from "src/app/admin/role-administration/role-administration.module";
import { entityConfig } from "src/app/data/entity-metadata";
import { EntityStoreModule } from "src/app/data/entity-store.module";
import { CategoryManagementModule } from "src/app/management/category-management/category-management.module";
import { ForbiddenModule } from "src/app/shared/modules/forbidden/forbidden.module";
import { ProductManagementModule } from "src/app/management/product-management/product-management.module";
import { DealersModule } from "src/app/shared/modules/dealers/dealers.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientXsrfModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ router: routerReducer }, {}),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
    EntityStoreModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
    IdentityModule,
    CategoriesModule,
    DealersModule,
    AuthModule,
    CategoryManagementModule,
    ProductManagementModule,
    ProductListModule,
    ProfileSettingsModule,
    AuthorityGroupingReportModule,
    RoleAdministrationModule,
    LoadingModule,
    SupportModule,
    SharedModule,
    AppFooterModule,
    AppNavbarModule,
    ForbiddenModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpXsrfInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
