import { createSelector } from '@ngrx/store';
import { State } from '../reducers/auth.reducer';

interface AuthState {
  auth: State;
}

const selectAuth = (state: AuthState): State => state.auth;

const getStateError = createSelector(
  selectAuth,
  (state: State) => state.errorMsg
);
const getStateUser = createSelector(selectAuth, (state: State) => state.user);
const getStateAuthentication = createSelector(
  selectAuth,
  (state: State) => state.isAuthenticated
);

export { getStateError, getStateUser, getStateAuthentication };
