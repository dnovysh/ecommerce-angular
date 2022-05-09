import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { ActivatedRoute, Params } from "@angular/router";

import { SignInRouteQueryParamsInterface } from "src/app/auth/types/sign-in-route-query-params.interface";
import { CommonHelperClass } from "src/app/shared/helpers/common-helper.class";


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

  constructor(private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initializeValues()
    this.initializeForm()
  }

  onSubmit(): void {
    console.log(this.form.value)
    console.log('ToDo dispatch login action')
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
    this.form = this.fb.group({
      email: '',
      password: '',
      rememberMe: false
    })
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
