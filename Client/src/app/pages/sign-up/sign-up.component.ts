import { Component } from '@angular/core';

import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { SignUpService } from './services/sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  iGoogle = faGoogle;

  constructor(private signUpService: SignUpService) {}

  signUp(user: any) {
    console.log('signUp -> user', user);
    this.signUpService.signUp(user);
  }

  facebookSignUp() {
    console.log('facebookSignUp');
  }

  googleSignUp() {
    console.log('googleSignUp');
  }
}
