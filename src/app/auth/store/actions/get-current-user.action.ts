import { createAction, props } from '@ngrx/store'

import { BackendErrorsInterface } from 'src/app/shared/types/backend-errors.interface'
import { CurrentUserInterface } from 'src/app/shared/types/current-user.interface'
import { LoginRequestInterface } from '../../types/login-request-interface'
import { ActionTypes } from '../actionTypes'

export const getCurrentUserAction = createAction(ActionTypes.GET_CURRENT_USER)

export const getCurrentUserSuccessAction = createAction(
  ActionTypes.GET_CURRENT_USER_SUCCESS,
  props<{ currentUser: CurrentUserInterface }>()
)

export const getCurrentUserFailureAction = createAction(
  ActionTypes.GET_CURRENT_USER_FAILURE
)
