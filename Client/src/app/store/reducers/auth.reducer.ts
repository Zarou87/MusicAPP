import { createReducer, on } from '@ngrx/store';
import * as action from '../actions/auth.action';
import { User } from 'src/app/core/models/user.model';

export interface State {
  isAuthenticated: boolean;
  user: User | null;
  errorMsg: string | null;
}

export const initialState: State = {
  isAuthenticated: false,
  user: null,
  errorMsg: null,
};

const _authReducer = createReducer(
  initialState,
  on(action.authSuccess, (state, { user }) => {
    return { ...state, isAuthenticated: true, user: user, errorMsg: null };
  }),
  on(action.authError, (state, { error }) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
      errorMsg: error.error.message,
    };
  }),
  on(action.logOutSuccess, (state) => {
    return { ...state, initialState };
  })
);

export function authReducer(state: any, action: any) {
  return _authReducer(state, action);
}
