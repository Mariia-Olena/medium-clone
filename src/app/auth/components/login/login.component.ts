import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { loginAction } from 'src/app/auth/store/actions/login.action';
import { isSubmittingSelector, validationErrorsSelector } from 'src/app/auth/store/selectors';
import { LoginRequestInterface } from 'src/app/auth/types/login-request.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backend-errors.interface';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  registerForm = new FormGroup({
    email: new FormControl('maria-olena@test.com', [Validators.required, Validators.email]),
    password: new FormControl('1234512345', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface | null>;

  constructor(private store: Store) {}

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  onSubmit(): void {
    const request: LoginRequestInterface = {
      user: this.registerForm.getRawValue(),
    };
    this.store.dispatch(loginAction({ request }));
  }

  ngOnInit(): void {
    this.initializeValues();
  }
}
