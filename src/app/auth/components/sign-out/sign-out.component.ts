import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { select, Store } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/types/app-state.interface";
import { signOutAction } from "src/app/auth/store/actions/sign-out.action";
import { signOutIsInProgressSelector, signOutMessageIfSuccessfulSelector } from "src/app/auth/store/selectors";

@Component({
  selector: 'ec-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss']
})
export class SignOutComponent implements OnInit {
  signOutIsInProgress$: Observable<boolean>
  message$: Observable<string | null>

  constructor(private store: Store<AppStateInterface>) { }

  ngOnInit(): void {
    this.signOutIsInProgress$ = this.store.pipe(select(signOutIsInProgressSelector))
    this.message$ = this.store.pipe(select(signOutMessageIfSuccessfulSelector))
    this.store.dispatch(signOutAction())
  }
}
