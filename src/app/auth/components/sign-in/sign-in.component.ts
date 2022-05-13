import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { filter, Subscription } from "rxjs";
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
import { Checkbox } from "primeng/checkbox";
import { FocusNodes } from "src/app/shared/helpers/focus/focus-nodes";
import { FocusNode } from "src/app/shared/helpers/focus/focus-node";


@Component({
  selector: 'ec-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("signUpHref") signUpHref: ElementRef;
  @ViewChild("signInEmail") signInEmail: ElementRef;
  @ViewChild("signInPassword") signInPassword: Password;
  @ViewChild("signInRememberMe") signInRememberMe: Checkbox;
  @ViewChild("signInSubmitButton") signInSubmitButton: ElementRef;
  @ViewChild("backToShopHref") backToShopHref: ElementRef;
  focusNodes: FocusNodes

  isSubmittingSubscription: Subscription
  validationErrorsSubscription: Subscription
  isUnknownErrorSubscription: Subscription
  form: FormGroup
  isSubmitStarted: boolean
  isSubmitting: boolean
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
    this.isSubmittingSubscription.unsubscribe()
    this.validationErrorsSubscription.unsubscribe()
    this.isUnknownErrorSubscription.unsubscribe()
  }

  ngAfterViewInit(): void {
    this.focusNodes = new FocusNodes([
      new FocusNode('signInEmail', this.signInEmail),
      new FocusNode('signInPassword', this.signInPassword),
      new FocusNode('signInRememberMe', this.signInRememberMe),
      new FocusNode('signInSubmitButton', this.signInSubmitButton),
      new FocusNode('backToShopHref', this.backToShopHref),
      new FocusNode('signUpHref', this.signUpHref)
    ])
    this.focusDefault()
  }

  onSubmit(): void {
    this.isSubmitStarted = true
    if (this.form.invalid) {
      console.log('Form invalid')
      return
    }

    const signInRequest: SignInRequestInterface = { user: this.form.value }
    const returnUrl: string = (
      this.signInQueryParams.returnUrl && !this.signInQueryParams.returnUrl.includes('/login')
    ) ? this.signInQueryParams.returnUrl : '/'

    console.log(signInRequest)
    console.log(returnUrl)

    this.store.dispatch(signInAction({ signInRequest, returnUrl }))
  }

  onKeydownFormField($event: KeyboardEvent, refName: string): void {
    if ($event.key !== 'Tab' && $event.key !== 'Enter') {
      return
    }
    if ($event.key === 'Enter' &&
      (refName === 'signInSubmitButton' || refName === 'backToShopHref' || refName === 'signUpHref')) {
      return
    }
    $event.preventDefault()
    if ($event.key === 'Tab' && $event.shiftKey) {
      this.focusNodes.focusPrev()
      return
    }
    this.focusNodes.focusNext()
  }

  onFocus($event: FocusEvent | MouseEvent, refName: string) {
    if (refName) {
      this.focusNodes.setFocusedNodeByKey(refName)
    }
  }

  onToastClose(): void {
    if (this.focusNodes?.getFocusedNodeKey()) {
      this.focusNodes.focusByKey(this.focusNodes.getFocusedNodeKey())
      return
    }
    this.focusDefault()
  }

  focusDefault(): void {
    this.focusNodes.focusByKey('signInEmail')
  }

  get formControls() { return this.form.controls }

  get isEmailValidationErrors() {
    console.log('isEmailValidationErrors')
    return this.isSubmitStarted && this.formControls['email'].errors
  }

  get emailError() {

    console.log(this.formControls)

    return this.formControls['email'].errors ? this.formControls['email'].errors : ''
  }

  private initializeValues(): void {
    this.isSubmitStarted = false
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
    this.form = this.fb.group(initialValue, { updateOn: 'submit' })
    this.form.controls["email"].addValidators([Validators.email, Validators.required]);
    this.form.controls["password"].addValidators([Validators.required]);
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
    this.isSubmittingSubscription = this.store
      .pipe(select(isSubmittingSelector))
      .subscribe((value: boolean) => {
        this.isSubmitting = value
        if (!this.isSubmitting && this.focusNodes?.getFocusedNodeKey() === 'signInSubmitButton') {
          this.focusNodes.focusByKey('signInSubmitButton')
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
