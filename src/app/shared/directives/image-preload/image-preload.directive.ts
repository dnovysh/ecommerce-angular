import {Directive, HostBinding, Input} from "@angular/core";

@Directive({
  selector: 'img[default]',
  host: {
    '(error)': 'updateUrl()',
    '(load)': 'load()',
    '[src]': 'src',
    '[alt]': 'alt'
  }
})

export class ImagePreloadDirective {
  @Input() src: string;
  @Input() alt: string;
  @Input() default: string;
  @Input() defaultAlt: string;
  @HostBinding('class') className: string;

  updateUrl() {
    if (this.src !== this.default) {
      this.src = this.default;
    } else {
      this.alt = this.defaultAlt;
    }
  }

  load() {
    this.className = 'image-loaded';
  }
}
