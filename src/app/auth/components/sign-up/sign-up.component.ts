import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { MessageService } from "primeng/api";
import { filter, Subscription } from "rxjs";

import { AppStateInterface } from "src/app/shared/types/app-state.interface";
import { ValidationErrorInterface } from "src/app/shared/types/error/validation-error.interface";
import { ApiErrorInterface } from "src/app/shared/types/error/api-error.interface";
import { SignInRouteQueryParamsInterface } from "src/app/auth/types/sign-in-route-query-params.interface";
import { SignUpFormGroupInterface } from "src/app/auth/types/sign-up-form-group.interface";
import { SignUpRequestInterface } from "src/app/auth/types/sign-up-request.interface";
import {
  badRequestWithoutDetailsSelector,
  isSubmittingSelector,
  isUnknownErrorSelector,
  validationErrorsSelector
} from "src/app/auth/store/selectors";
import { CommonHelperClass } from "src/app/shared/helpers/common-helper.class";
import { signUpAction } from "src/app/auth/store/actions/sign-up.action";
import { Password } from "primeng/password";


// noinspection DuplicatedCode
@Component({
  selector: 'ec-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {
  @ViewChild("signUpEmail") signUpEmail: ElementRef;
  @ViewChild("signUpPassword") signUpPassword: Password;
  @ViewChild("signUpSubmitButton") signUpSubmitButton: ElementRef;

  isSubmittingSubscription: Subscription
  validationErrorsSubscription: Subscription
  badRequestWithoutDetailsSubscription: Subscription
  isUnknownErrorSubscription: Subscription

  form: FormGroup
  aliasControl: AbstractControl
  emailControl: AbstractControl
  passwordControl: AbstractControl

  isSubmitting: boolean
  validationErrors: ValidationErrorInterface[]
  apiError: ApiErrorInterface | null
  isUnknownError: boolean

  isAliasInvalid: boolean
  aliasValidationErrors: string[] | null
  isEmailInvalid: boolean
  emailValidationErrors: string[] | null
  isPasswordInvalid: boolean
  passwordValidationErrors: string[] | null
  objectErrors: string[] | null

  signUpQueryParams: SignInRouteQueryParamsInterface
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
    this.badRequestWithoutDetailsSubscription.unsubscribe()
    this.isUnknownErrorSubscription.unsubscribe()
  }

  onSubmit(): void {
    if (this.isSubmitting) {
      this.messageService.add({
        key: 'signUpErrorToast',
        severity: 'error',
        summary: 'Error',
        detail: 'The previous authentication process has not been completed, please wait for it to complete',
        life: 3000
      })
      return
    }

    this.isAliasInvalid = this.aliasControl.invalid
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

    const formValue: SignUpFormGroupInterface = this.form.value

    const signUpRequest: SignUpRequestInterface = {
      userAlias: formValue.alias,
      username: formValue.email,
      password: formValue.password
    }

    const returnUrl: string = (
      this.signUpQueryParams.returnUrl && !this.signUpQueryParams.returnUrl.includes('/signup')
    ) ? this.signUpQueryParams.returnUrl : '/'

    this.store.dispatch(signUpAction({ signUpRequest, returnUrl }))
  }

  onAliasInput(): void {
    if (this.isAliasInvalid) {
      this.resetAliasErrors()
    }
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

  onKeydownEnterFocusNext($event: KeyboardEvent, nextElement: HTMLInputElement | HTMLButtonElement | Password): void {
    if ($event.key === 'Enter') {
      $event.preventDefault()
      if (nextElement instanceof Password) {
        nextElement.input.nativeElement.focus()
        return
      }
      nextElement.focus()
    }
  }

  private initializeValues(): void {
    this.resetAliasErrors()
    this.resetEmailErrors()
    this.resetPasswordErrors()
    this.signUpQueryParams = {
      guardRedirect: this.route.snapshot.queryParams['guardRedirect'] === 'true',
      returnUrl: this.route.snapshot.queryParams['returnUrl']
    }
    if (this.signUpQueryParams.returnUrl
      && !this.signUpQueryParams.guardRedirect
      && !this.signUpQueryParams.returnUrl.includes('/signup')) {
      this.setBackToShopValues(this.signUpQueryParams.returnUrl)
    } else {
      this.setBackToShopValuesDefault()
    }
  }

  private initializeForm(): void {
    const initialValue: SignUpFormGroupInterface = {
      alias: '',
      email: '',
      password: ''
    }
    this.form = this.fb.group(initialValue, { updateOn: 'submit' })
    this.aliasControl = this.form.controls["alias"]
    this.aliasControl.addValidators([Validators.required]);
    this.aliasControl.updateValueAndValidity()
    this.emailControl = this.form.controls["email"]
    this.emailControl.addValidators([Validators.email, Validators.required]);
    this.emailControl.updateValueAndValidity()
    this.passwordControl = this.form.controls["password"]
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
            key: 'signUpErrorToast',
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

  private resetAliasErrors(): void {
    this.isAliasInvalid = false
    this.aliasValidationErrors = null
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
    const aliasErrors: string[] = []
    const emailErrors: string[] = []
    const passwordErrors: string[] = []
    const objectErrors: string[] = []
    this.validationErrors.forEach((error) => {
      if (error.field === "userAlias") {
        aliasErrors.push(error.message)
      } else if (error.field === "username") {
        emailErrors.push(error.message)
      } else if (error.field === "password") {
        passwordErrors.push(error.message)
      } else if (error.field === null) {
        objectErrors.push(error.message)
      }
    })
    if (aliasErrors.length > 0) {
      this.isAliasInvalid = true
      this.aliasValidationErrors = aliasErrors
    }
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
}
