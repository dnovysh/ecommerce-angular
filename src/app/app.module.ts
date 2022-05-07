import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
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


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ router: routerReducer }, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
    IdentityModule,
    CategoriesModule,
    AuthModule,
    ProductListModule,
    LoadingModule,
    SharedModule,
    AppFooterModule,
    AppRoutingModule,
    AppNavbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
