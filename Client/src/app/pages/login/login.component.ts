import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_PATH } from 'src/app/core/const/app.conts';
import { LoginService } from './services/login.service';

import {
  faFacebookSquare,
  faApple,
  faGoogle,
} from '@fortawesome/free-brands-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.states';
import * as authSelectors from 'src/app/store/selectors/auth.selector';

@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit {
  iFacebook = faFacebookSquare;
  iApple = faApple;
  iGoogle = faGoogle;
  iAlertDanger = faExclamationCircle;

  // public displayAlert: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store
      .select(authSelectors.getStateAuthentication)
      .subscribe((b) => console.log('isAuthenticated', b));
    this.store.subscribe((auth) => console.log('auth', auth));
    // this.displayAlert = false;
  }

  login(obj: any) {
    this.loginService.login(obj);
  }

  facebookLogin() {
    console.log('Facebook Login');
  }

  appleLogin() {
    console.log('Apple Login');
  }

  googleLogin() {
    console.log('Google Login');
  }

  routesignUp() {
    this.router.navigateByUrl(ROUTE_PATH.SIGNUP);
  }
}
