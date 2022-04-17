import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppNavbarComponent } from './app-navbar.component';
import { RouterModule } from "@angular/router";
import { InputTextModule } from "primeng/inputtext";


@NgModule({
  declarations: [
    AppNavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    InputTextModule
  ],
  exports: [
    AppNavbarComponent
  ]
})
export class AppNavbarModule {}
