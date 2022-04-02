import { ActionReducerMap } from '@ngrx/store';
import * as auth from './reducers/auth.reducer';

export interface AppState {
  auth: auth.State;
}

export const reducers: ActionReducerMap<any> = {
  auth: auth.authReducer,
};
