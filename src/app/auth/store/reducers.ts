import { Action, createReducer, on } from '@ngrx/store';
import { AuthStateInterface } from 'src/app/auth/types/auth-state.interface';
import {
  registerAction,
  registerSuccessAction,
  registerFailureAction,
} from 'src/app/auth/store/actions/register.action';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  currentUser: null,
  isLoggedIn: null,
  validationErrors: null,
};

const authReducer = createReducer(
  initialState,
  on(registerAction, (state): AuthStateInterface => {
    return { 
      ...state, 
      isSubmitting: true, 
      validationErrors: null
    };
  }),
  on(registerSuccessAction, (state, action): AuthStateInterface => {
    return {
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
    };
  }),
  on(registerFailureAction, (state, action): AuthStateInterface => {
    return {
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    };
  })
);

export function reducer(state: AuthStateInterface, action: Action) {
  return authReducer(state, action);
}
