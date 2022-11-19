import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Actions, ofType } from "@ngrx/effects";
import { Subscription } from "rxjs";
import { routerNavigatedAction } from "@ngrx/router-store";

@Component({
  selector: 'ec-shared-sidebar',
  templateUrl: './shared-sidebar.component.html',
  styleUrls: ['./shared-sidebar.component.scss']
})
export class SharedSidebarComponent implements OnInit, OnDestroy {
  @Input("visible") visibleProperties: boolean
  @Output("visibleChange") visiblePropertiesChange = new EventEmitter<boolean>();

  routerNavigatedActionSubscription: Subscription

  onVisibleChange(): void {
    this.visiblePropertiesChange.emit(this.visibleProperties)
  }

  constructor(private actions$: Actions) { }

  ngOnInit(): void {
    this.routerNavigatedActionSubscription = this.actions$.pipe(ofType(routerNavigatedAction))
      .subscribe((value) => {
        if (this.visibleProperties) {
          this.visiblePropertiesChange.emit(false)
        }
      })
  }

  ngOnDestroy(): void {
    this.routerNavigatedActionSubscription.unsubscribe()
  }
}
