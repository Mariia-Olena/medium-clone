import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { BackendErrorsInterface } from 'src/app/shared/types/backend-errors.interface'
import { loginAction } from '../../store/actions/login.action'
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '../../store/selectors'
import { LoginRequestInterface } from '../../types/login-request-interface'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup
  isSubmitting$: Observable<boolean>
  backendErrors$: Observable<BackendErrorsInterface | null>

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeForm()
    this.initializeValues()
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
  }

  initializeForm(): void {
    this.form = this.fb.group({
      email: [''],
      password: [''],
    })
  }

  onSubmit(): void {
    console.log('submit', this.form.value, this.form.valid)
    const request: LoginRequestInterface = {
      user: this.form.value,
    }
    this.store.dispatch(loginAction({ request }))
  }
}
