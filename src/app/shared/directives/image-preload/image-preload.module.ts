import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImagePreloadDirective} from "src/app/shared/directives/image-preload/image-preload.directive";


@NgModule({
  declarations: [ImagePreloadDirective],
  imports: [
    CommonModule
  ],
  exports: [
    ImagePreloadDirective
  ]
})
export class ImagePreloadModule {
}
