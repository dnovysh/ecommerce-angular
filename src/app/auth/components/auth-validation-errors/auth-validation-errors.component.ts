import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ec-auth-validation-errors',
  templateUrl: './auth-validation-errors.component.html',
  styleUrls: ['./auth-validation-errors.component.scss']
})
export class AuthValidationErrorsComponent {
  @Input('errors') errorsProps: string[]
}
