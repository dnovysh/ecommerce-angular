import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { InputTextModule } from "primeng/inputtext";
import { BadgeModule } from 'primeng/badge';
import { FormsModule } from "@angular/forms";
import { OverlayPanelModule } from "primeng/overlaypanel";

import { AppNavbarComponent } from 'src/app/shared/modules/app-navbar/components/app-navbar/app-navbar.component';
import { UserProfileMenuComponent } from './components/user-profile-menu/user-profile-menu.component';


@NgModule({
  declarations: [
    AppNavbarComponent,
    UserProfileMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    InputTextModule,
    BadgeModule,
    FormsModule,
    OverlayPanelModule
  ],
  exports: [
    AppNavbarComponent
  ]
})
export class AppNavbarModule {}
