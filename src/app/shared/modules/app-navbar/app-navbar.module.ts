import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppNavbarComponent } from './app-navbar.component';
import { RouterModule } from "@angular/router";
import { InputTextModule } from "primeng/inputtext";
import { BadgeModule } from 'primeng/badge';
import { FormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    AppNavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    InputTextModule,
    BadgeModule,
    FormsModule
  ],
  exports: [
    AppNavbarComponent
  ]
})
export class AppNavbarModule {}
