import { Injectable } from '@angular/core';
import { LOCAL_STORAGE } from '../../const/app.conts';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getAuthToken() {
    return localStorage.getItem(LOCAL_STORAGE.TOKEN);
  }

  setAuthToken(value: string) {
    return localStorage.setItem(LOCAL_STORAGE.TOKEN, value);
  }

  removeAuthToken() {
    localStorage.removeItem(LOCAL_STORAGE.TOKEN);
  }
}
