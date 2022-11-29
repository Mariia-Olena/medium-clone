import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, of, switchMap, map } from 'rxjs'

import { PersistenceService } from 'src/app/shared/services/persistence.service'
import { CurrentUserInterface } from 'src/app/shared/types/current-user.interface'
import { AuthService } from '../../services/auth.service'
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction,
} from '../actions/get-current-user.action'

@Injectable()
export class GetCurrentUserEffect {
  getCurrentUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(getCurrentUserAction),
      switchMap(() => {
        const token = this.persistanceService.get('accessToken')
        if (!token) {
          return of(getCurrentUserFailureAction())
        }
        return this.authService.getCurrentUser().pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistanceService
            return getCurrentUserSuccessAction({ currentUser })
          }),
          catchError(() => {
            return of(getCurrentUserFailureAction())
          })
        )
      })
    )
  )

  constructor(
    private action$: Actions,
    private authService: AuthService,
    private persistanceService: PersistenceService
  ) {}
}
