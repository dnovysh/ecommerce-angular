import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ec-shared-sidebar',
  templateUrl: './shared-sidebar.component.html',
  styleUrls: ['./shared-sidebar.component.scss']
})
export class SharedSidebarComponent implements OnInit {
  @Input("visible") visibleProperties: boolean
  @Output("visibleChange") visiblePropertiesChange = new EventEmitter<boolean>();

  onVisibleChange(): void {
    this.visiblePropertiesChange.emit(this.visibleProperties)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
