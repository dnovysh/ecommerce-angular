import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedSidebarComponent } from './shared-sidebar.component';
import { SidebarModule } from "primeng/sidebar";


@NgModule({
  declarations: [
    SharedSidebarComponent
  ],
  exports: [
    SharedSidebarComponent
  ],
  imports: [
    CommonModule,
    SidebarModule
  ]
})
export class SharedSidebarModule { }
