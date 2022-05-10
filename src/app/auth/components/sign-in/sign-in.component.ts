import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { filter, Observable, Subscription } from "rxjs";
import { ActivatedRoute, Params } from "@angular/router";
import { select, Store } from "@ngrx/store";

import { SignInRouteQueryParamsInterface } from "src/app/auth/types/sign-in-route-query-params.interface";
import { CommonHelperClass } from "src/app/shared/helpers/common-helper.class";
import { SignInRequestInterface } from "src/app/auth/types/sign-in-request.interface";
import { SignInFormGroupInterface } from "src/app/auth/types/sign-in-form-group.interface";
import { signInAction } from "src/app/auth/store/actions/sign-in.action";
import { AppStateInterface } from "src/app/shared/types/app-state.interface";
import { isSubmittingSelector, isUnknownErrorSelector, validationErrorsSelector } from "src/app/auth/store/selectors";
import { ValidationErrorInterface } from "src/app/shared/types/error/validation-error.interface";
import { MessageService } from "primeng/api";
import { Password } from "primeng/password";


@Component({
  selector: 'ec-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {
  form: FormGroup
  isSubmitting$: Observable<boolean>
  validationErrorsSubscription: Subscription
  isUnknownErrorSubscription: Subscription

  validationErrors: ValidationErrorInterface[]
  isUnknownError: boolean

  signInQueryParams: SignInRouteQueryParamsInterface
  backToShopLink: string
  backToShopQueryParams: Params | null

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private store: Store<AppStateInterface>,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.initializeValues()
    this.initializeForm()
    this.initializeListeners()
  }

  ngOnDestroy(): void {
    this.validationErrorsSubscription.unsubscribe()
    this.isUnknownErrorSubscription.unsubscribe()
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

  onKeydownEnter($event: any, element: ElementRef | Password): void {
    $event.preventDefault()
    console.log($event)
    console.log(element)
    console.log($event.target)
    console.log($event.target.nextElementSibling)

    setTimeout(() => {
      if (element instanceof Password) {
        element.input.nativeElement.focus()
        return
      }
      element.nativeElement.focus()
    }, 0)
  }

  private initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
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

  private initializeListeners() {
    this.validationErrorsSubscription = this.store
      .pipe(select(validationErrorsSelector), filter(Boolean))
      .subscribe((value: ValidationErrorInterface[]) => {
        this.validationErrors = value
      })

    this.isUnknownErrorSubscription = this.store
      .pipe(select(isUnknownErrorSelector))
      .subscribe((value: boolean) => {
        this.isUnknownError = value
        if (this.isUnknownError) {
          this.messageService.add({
            key: 'signInErrorToast',
            severity: 'error',
            summary: 'Error',
            detail: 'Something went wrong, please try again later or contact support',
            life: 3000
          })
        }
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
