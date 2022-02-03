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

  public displayAlert: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.displayAlert = false;
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
