import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppNavbarComponent } from './app-navbar.component';
import { RouterModule } from "@angular/router";
import { InputTextModule } from "primeng/inputtext";
import { BadgeModule } from 'primeng/badge';


@NgModule({
  declarations: [
    AppNavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    InputTextModule,
    BadgeModule
  ],
  exports: [
    AppNavbarComponent
  ]
})
export class AppNavbarModule {}
