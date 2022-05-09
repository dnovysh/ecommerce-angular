import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { InputTextModule } from "primeng/inputtext";
import { CheckboxModule } from "primeng/checkbox";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PasswordModule } from "primeng/password";


const routes: Routes = [
  { path: 'login', component: SignInComponent },
  { path: 'signup', component: SignUpComponent }
]

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    RippleModule,
    PasswordModule
  ],
  exports: [
    SignInComponent,
    SignUpComponent
  ]
})
export class AuthModule {}
