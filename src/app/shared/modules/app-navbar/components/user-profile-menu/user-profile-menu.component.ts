import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/types/app-state.interface";
import { userAliasSelector, usernameSelector } from "src/app/shared/modules/identity/store/selectors";
import { filter, Observable } from "rxjs";

@Component({
  selector: 'ec-user-profile-menu',
  templateUrl: './user-profile-menu.component.html',
  styleUrls: ['./user-profile-menu.component.scss']
})
export class UserProfileMenuComponent implements OnInit {
  @Output() clickMenuItem = new EventEmitter<MouseEvent>()

  userAlias$: Observable<string | null>;
  username$: Observable<string | null>;

  constructor(private store: Store<AppStateInterface>) { }

  ngOnInit(): void {
    this.userAlias$ = this.store.pipe(select(userAliasSelector), filter(Boolean))
    this.username$ = this.store.pipe(select(usernameSelector), filter(Boolean))
  }

  onClickProfileSettings($event: MouseEvent) {
    this.clickMenuItem.emit($event)
  }

  onClickSupport($event: MouseEvent) {
    this.clickMenuItem.emit($event)
  }

  onClickLogout($event: MouseEvent) {
    this.clickMenuItem.emit($event)
  }
}
