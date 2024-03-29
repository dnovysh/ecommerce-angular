import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { InputTextModule } from "primeng/inputtext";
import { CheckboxModule } from "primeng/checkbox";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PasswordModule } from "primeng/password";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ToastModule } from "primeng/toast";
import { MessageModule } from "primeng/message";


import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignOutComponent } from './components/sign-out/sign-out.component';
import { AuthValidationErrorsComponent } from './components/auth-validation-errors/auth-validation-errors.component';
import { AuthErrorComponent } from './components/auth-error/auth-error.component';
import { SignInEffect } from "src/app/auth/store/effects/sign-in.effect";
import { SignUpEffect } from "src/app/auth/store/effects/sign-up.effect";
import { SignOutEffect } from "src/app/auth/store/effects/sign-out.effect";
import { AuthService } from "src/app/auth/services/auth.service";
import { reducer } from "src/app/auth/store/reducers";
import { LoadingModule } from "src/app/shared/modules/loading/loading.module";
import { UserDetailsMapper } from "src/app/shared/modules/identity/mappers/user-details.mapper";


const routes: Routes = [
  { path: 'login', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'logout', component: SignOutComponent }
]

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    SignOutComponent,
    AuthValidationErrorsComponent,
    AuthErrorComponent
  ],
  providers: [
    AuthService,
    UserDetailsMapper
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('auth', reducer),
    EffectsModule.forFeature([SignInEffect, SignUpEffect, SignOutEffect]),
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    RippleModule,
    PasswordModule,
    ToastModule,
    MessageModule,
    LoadingModule
  ],
  exports: [
    SignInComponent,
    SignUpComponent
  ]
})
export class AuthModule {}
