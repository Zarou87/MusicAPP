import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/core/models/user.model';

/* eslint-disable no-unused-vars */
export enum AuthActionTypes {
  LOGIN = '[Auth API] Auth Log In',
  SIGNUP = '[Auth API] Auth Sign Up',
  LOGOUT = '[Auth API] Auth Log Out',
  AUTH_SUCCESS = '[Auth API] Auth Success',
  AUTH_ERROR = '[Auth API] Auth Error',
  LOGOUT_SUCCESS = '[Auth API] Log Out Success',
}

export const logIn = createAction(
  AuthActionTypes.LOGIN,
  props<{ payload: User }>()
);
export const SignUp = createAction(
  AuthActionTypes.SIGNUP,
  props<{ payload: User }>()
);

export const authSuccess = createAction(
  AuthActionTypes.AUTH_SUCCESS,
  props<{ user: User }>()
);
export const authError = createAction(
  AuthActionTypes.AUTH_ERROR,
  props<{ error: any }>()
);

export const logOut = createAction(AuthActionTypes.LOGOUT);

export const logOutSuccess = createAction(AuthActionTypes.LOGOUT_SUCCESS);
