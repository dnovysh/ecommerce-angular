import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";

import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { InputTextModule } from "primeng/inputtext";
import { CheckboxModule } from "primeng/checkbox";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PasswordModule } from "primeng/password";
import { EffectsModule } from "@ngrx/effects";
import { SignInEffect } from "src/app/auth/store/effects/sign-in.effect";
import { AuthService } from "src/app/auth/services/auth.service";
import { StoreModule } from "@ngrx/store";
import { reducer } from "src/app/auth/store/reducers";
import { ToastModule } from "primeng/toast";


const routes: Routes = [
  { path: 'login', component: SignInComponent },
  { path: 'signup', component: SignUpComponent }
]

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent
  ],
  providers: [
    AuthService
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('auth', reducer),
        EffectsModule.forFeature([SignInEffect]),
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        CheckboxModule,
        ButtonModule,
        RippleModule,
        PasswordModule,
        ToastModule
    ],
  exports: [
    SignInComponent,
    SignUpComponent
  ]
})
export class AuthModule {}
