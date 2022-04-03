import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.states';
import { LOCAL_STORAGE } from '../../const/app.conts';
import * as authActions from 'src/app/store/actions/auth.action';
import * as authSelectors from 'src/app/store/selectors/auth.selector';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private store: Store<AppState>) {}

  logIn(payload: User) {
    this.store.dispatch(authActions.logIn({ payload }));
  }

  signUp(payload: User) {
    this.store.dispatch(authActions.SignUp({ payload }));
  }

  logOut() {
    this.store.dispatch(authActions.logOut());
  }

  getAuthToken() {
    return localStorage.getItem(LOCAL_STORAGE.TOKEN);
  }

  setAuthToken(value: string) {
    return localStorage.setItem(LOCAL_STORAGE.TOKEN, value);
  }

  removeAuthToken() {
    localStorage.removeItem(LOCAL_STORAGE.TOKEN);
  }

  isAuthenticated(): Observable<boolean> {
    return this.store.select(authSelectors.getStateAuthentication);
  }

  getUser(): Observable<User | null> {
    return this.store.select(authSelectors.getStateUser);
  }

  getError(): Observable<string | null> {
    return this.store.select(authSelectors.getStateError);
  }
}
