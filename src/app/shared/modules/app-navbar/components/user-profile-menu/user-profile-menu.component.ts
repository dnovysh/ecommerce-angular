import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ec-user-profile-menu',
  templateUrl: './user-profile-menu.component.html',
  styleUrls: ['./user-profile-menu.component.scss']
})
export class UserProfileMenuComponent implements OnInit {
  @Output() clickMenuItem = new EventEmitter<MouseEvent>()

  constructor() { }

  ngOnInit(): void {
  }

  onClickSupport($event: MouseEvent) {
    this.clickMenuItem.emit($event)
  }
}
