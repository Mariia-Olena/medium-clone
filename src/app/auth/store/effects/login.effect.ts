import { HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, of, switchMap, map, tap } from 'rxjs'

import { PersistenceService } from 'src/app/shared/services/persistence.service'
import { CurrentUserInterface } from 'src/app/shared/types/current-user.interface'
import { AuthService } from '../../services/auth.service'
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
} from '../actions/login.action'

@Injectable()
export class LoginEffect {
  login$ = createEffect(() =>
    this.action$.pipe(
      ofType(loginAction),
      switchMap(({ request }) => {
        return this.authService.login(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistanceService.set('accessToken', currentUser.token)
            return loginSuccessAction({ currentUser })
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              loginFailureAction({ errors: errorResponse.error.errors })
            )
          })
        )
      })
    )
  )

  redirectAfterSubmit$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(loginSuccessAction),
        tap(() => {
          this.router.navigateByUrl('/')
        })
      ),
    { dispatch: false }
  )

  constructor(
    private action$: Actions,
    private authService: AuthService,
    private persistanceService: PersistenceService,
    private router: Router
  ) {}
}
