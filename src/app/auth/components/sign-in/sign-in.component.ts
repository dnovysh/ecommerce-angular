import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { filter, Subscription } from "rxjs";
import { ActivatedRoute, Params } from "@angular/router";
import { select, Store } from "@ngrx/store";

import { SignInRouteQueryParamsInterface } from "src/app/auth/types/sign-in-route-query-params.interface";
import { CommonHelperClass } from "src/app/shared/helpers/common-helper.class";
import { SignInRequestInterface } from "src/app/auth/types/sign-in-request.interface";
import { SignInFormGroupInterface } from "src/app/auth/types/sign-in-form-group.interface";
import { signInAction } from "src/app/auth/store/actions/sign-in.action";
import { AppStateInterface } from "src/app/shared/types/app-state.interface";
import {
  badRequestWithoutDetailsSelector,
  isSubmittingSelector,
  isUnknownErrorSelector,
  validationErrorsSelector
} from "src/app/auth/store/selectors";
import { ValidationErrorInterface } from "src/app/shared/types/error/validation-error.interface";
import { MessageService } from "primeng/api";
import { Password } from "primeng/password";
import { Checkbox } from "primeng/checkbox";
import { FocusNodes } from "src/app/shared/helpers/focus/focus-nodes";
import { FocusNode } from "src/app/shared/helpers/focus/focus-node";
import { ApiErrorInterface } from "src/app/shared/types/error/api-error.interface";


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
  badRequestWithoutDetailsSubscription: Subscription
  isUnknownErrorSubscription: Subscription
  form: FormGroup
  emailControl: AbstractControl
  passwordControl: AbstractControl
  isSubmitting: boolean
  validationErrors: ValidationErrorInterface[]
  apiError: ApiErrorInterface | null
  isUnknownError: boolean

  isEmailInvalid: boolean
  emailValidationErrors: string[] | null
  isPasswordInvalid: boolean
  passwordValidationErrors: string[] | null
  objectErrors: string[] | null

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
    this.badRequestWithoutDetailsSubscription.unsubscribe()
    this.isUnknownErrorSubscription.unsubscribe()
  }

  onSubmit(): void {
    this.isEmailInvalid = this.emailControl.invalid
    if (this.emailControl.errors && this.emailControl.errors['email'] === true) {
      this.emailValidationErrors = ['Valid e-mail address required']
    }
    this.isPasswordInvalid = this.passwordControl.invalid
    this.apiError = null
    this.objectErrors = null
    if (this.form.invalid) {
      return
    }

    const formValue: SignInFormGroupInterface = this.form.value

    const signInRequest: SignInRequestInterface = {
      username: formValue.email,
      password: formValue.password,
      rememberMe: formValue.rememberMe
    }

    const returnUrl: string = (
      this.signInQueryParams.returnUrl && !this.signInQueryParams.returnUrl.includes('/login')
    ) ? this.signInQueryParams.returnUrl : '/'

    this.store.dispatch(signInAction({ signInRequest, returnUrl }))
  }

  onEmailInput(): void {
    if (this.isEmailInvalid) {
      this.resetEmailErrors()
    }
  }

  onPasswordInput(): void {
    if (this.isPasswordInvalid) {
      this.resetPasswordErrors()
    }
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
    this.emailControl = this.f["email"]
    this.passwordControl = this.f["password"]
    this.emailControl.addValidators([Validators.email, Validators.required]);
    this.emailControl.updateValueAndValidity()
    this.passwordControl.addValidators([Validators.required]);
    this.passwordControl.updateValueAndValidity()
  }

  private initializeListeners() {
    this.validationErrorsSubscription = this.store
      .pipe(select(validationErrorsSelector), filter(Boolean))
      .subscribe((value: ValidationErrorInterface[]) => {
        this.validationErrors = value
        this.setApiValidationErrors()
      })
    this.badRequestWithoutDetailsSubscription = this.store
      .pipe(select(badRequestWithoutDetailsSelector), filter(Boolean))
      .subscribe((apiError) => {
        this.apiError = apiError
        this.objectErrors = [apiError.message]
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
    this.isEmailInvalid = false
    this.emailValidationErrors = null
  }

  private resetPasswordErrors(): void {
    this.isPasswordInvalid = false
    this.passwordValidationErrors = null
  }

  private setApiValidationErrors(): void {
    const emailErrors: string[] = []
    const passwordErrors: string[] = []
    const objectErrors: string[] = []
    this.validationErrors.forEach((error) => {
      if (error.field === "username") {
        emailErrors.push(error.message)
      } else if (error.field === "password") {
        passwordErrors.push(error.message)
      } else if (error.field === null) {
        objectErrors.push(error.message)
      }
    })
    if (emailErrors.length > 0) {
      this.isEmailInvalid = true
      this.emailValidationErrors = emailErrors
    }
    if (passwordErrors.length > 0) {
      this.isPasswordInvalid = true
      this.passwordValidationErrors = passwordErrors
    }
    if (objectErrors.length > 0) {
      this.objectErrors = objectErrors
    }
  }

  // Custom navigation by tab, shift-tab, enter
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

  onToastClose(): void {
    if (this.focusNodes?.getFocusedNodeKey()) {
      this.focusNodes.focusByKey(this.focusNodes.getFocusedNodeKey())
      return
    }
    this.focusDefault()
  }

  onFocus($event: FocusEvent | MouseEvent, refName: string) {
    if (refName) {
      this.focusNodes.setFocusedNodeByKey(refName)
    }
  }

  onPasswordWrapperFocus() {
    this.focusNodes.focusByKey('signInPassword')
  }

  onPasswordWrapperClick($event: MouseEvent) {
    $event.preventDefault()
    $event.stopPropagation()
    if ((<HTMLElement>$event.target).nodeName === 'I') {
      setTimeout(() => {
        const inputPasswordElement = <HTMLInputElement>this.signInPassword.input.nativeElement
        const endPosition = inputPasswordElement.value.length
        inputPasswordElement.setSelectionRange(endPosition, endPosition)
      }, 0)
    }
  }

  onRememberMeWrapperFocus(): void {
    this.focusNodes.focusByKey('signInRememberMe')
  }

  onBackgroundFocus() {
    this.focusDefault()
  }

  focusDefault(): void {
    this.focusNodes.focusByKey('signInEmail')
  }
}
