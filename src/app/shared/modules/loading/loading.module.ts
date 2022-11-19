import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingComponent} from 'src/app/shared/modules/loading/loading.component';
import {ProgressSpinnerModule} from "primeng/progressspinner";


@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [
    CommonModule,
    ProgressSpinnerModule
  ],
  exports: [
    LoadingComponent
  ]
})
export class LoadingModule {
}
