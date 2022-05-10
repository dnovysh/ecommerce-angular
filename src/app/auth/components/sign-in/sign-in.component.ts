import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { ActivatedRoute, Params } from "@angular/router";
import { Store } from "@ngrx/store";

import { SignInRouteQueryParamsInterface } from "src/app/auth/types/sign-in-route-query-params.interface";
import { CommonHelperClass } from "src/app/shared/helpers/common-helper.class";
import { SignInRequestInterface } from "src/app/auth/types/sign-in-request.interface";
import { SignInFormGroupInterface } from "src/app/auth/types/sign-in-form-group.interface";
import { signInAction } from "src/app/auth/store/actions/sign-in.action";
import { AppStateInterface } from "src/app/shared/types/app-state.interface";


@Component({
  selector: 'ec-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  form: FormGroup
  isSubmitting$: Observable<boolean>

  signInQueryParams: SignInRouteQueryParamsInterface
  backToShopLink: string
  backToShopQueryParams: Params | null

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private store: Store<AppStateInterface>) { }

  ngOnInit(): void {
    this.initializeValues()
    this.initializeForm()
  }

  onSubmit(): void {
    const signInRequest: SignInRequestInterface = { user: this.form.value }
    const returnUrl: string = (
      this.signInQueryParams.returnUrl && !this.signInQueryParams.returnUrl.includes('/login')
    ) ? this.signInQueryParams.returnUrl : '/'

    console.log(signInRequest)
    console.log(returnUrl)

    this.store.dispatch(signInAction({ signInRequest, returnUrl }))
  }

  private initializeValues(): void {
    this.signInQueryParams = {
      guardRedirect: this.route.snapshot.queryParams['guardRedirect'] === 'true',
      returnUrl: this.route.snapshot.queryParams['returnUrl']
    }
    if (this.signInQueryParams.returnUrl
      && !this.signInQueryParams.guardRedirect
      && !this.signInQueryParams.returnUrl.includes('/login')) {
      this.setBackToShopValues(this.signInQueryParams.returnUrl)
    } else {
      this.setBackToShopValuesDefault()
    }
  }

  private initializeForm(): void {
    const initialValue: SignInFormGroupInterface = {
      email: '',
      password: '',
      rememberMe: false
    }
    this.form = this.fb.group(initialValue)
  }

  private setBackToShopValues(returnUrl: string): void {
    const parsedUrl = CommonHelperClass.parseUrl(returnUrl)
    if (parsedUrl.successfullyParsed) {
      this.backToShopLink = parsedUrl.pathname
      this.backToShopQueryParams = parsedUrl.queryParams
      return
    }
    this.setBackToShopValuesDefault()
  }

  private setBackToShopValuesDefault(): void {
    this.backToShopLink = '/'
    this.backToShopQueryParams = null
  }
}
