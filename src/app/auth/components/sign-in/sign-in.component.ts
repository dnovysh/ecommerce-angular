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
  isSubmitting: boolean
  validationErrors: ValidationErrorInterface[]
  isUnknownError: boolean

  isEmailValidationErrors: boolean
  emailValidationErrors: string[] | null
  isPasswordValidationErrors: boolean
  passwordValidationErrors: string[] | null
  passwordInputStyleClass: string

  signInQueryParams: SignInRouteQueryParamsInterface
  backToShopLink: string
  backToShopQueryParams: Params | null

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private store: Store<AppStateInterface>,
              private messageService: MessageService) { }

  get f() { return this.form.controls }

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
    const emailControl = this.f['email']
    if (emailControl.invalid) {
      this.isEmailInvalid = true
    }

    if (this.f['email'].errors) {

      if (this.f['email'].errors['email'] === true) {
        this.emailValidationErrors = ['Valid e-mail address required']
      }
    }
    if (this.f['password'].errors) {
      this.isPasswordValidationErrors = true
      this.passwordInputStyleClass = `${this.passwordInputStyleClass} ng-dirty ng-invalid`
      this.passwordValidationErrors = ['Test error 1', 'Test error 2', 'Required field']
    }
    if (this.form.invalid) {
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

  onEmailInput(): void {
    if (this.isEmailValidationErrors) {
      this.resetEmailErrors()
    }
  }

  onPasswordInput(): void {
    if (this.isPasswordValidationErrors) {
      this.resetPasswordErrors()
    }
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

  private initializeValues(): void {
    this.resetEmailErrors()
    this.resetPasswordErrors()
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
    const emailControl = this.f["email"]
    emailControl.addValidators([Validators.email, Validators.required]);
    emailControl.updateValueAndValidity()
    const passwordControl = this.f["password"]
    passwordControl.addValidators([Validators.required]);
    passwordControl.updateValueAndValidity()
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

  private resetEmailErrors(): void {
    this.isEmailValidationErrors = false
    this.emailValidationErrors = null
  }

  private resetPasswordErrors(): void {
    this.isPasswordValidationErrors = false
    this.passwordValidationErrors = null
    this.passwordInputStyleClass = 'p-inputtext p-component p-element p-filled p-password-input'
  }
}
