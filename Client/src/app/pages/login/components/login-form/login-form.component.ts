import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LOCAL_STORAGE } from 'src/app/core/const/app.conts';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-login-form',
  styleUrls: ['./login-form.component.scss'],
  templateUrl: 'login-form.component.html',
})
export class LoginFormComponent implements OnInit {
  public loginForm: FormGroup = new FormGroup({});

  @Output() public userEventEmiter: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    const signIn: any = localStorage.getItem(LOCAL_STORAGE.SIGNIN)
      ? JSON.parse(localStorage.getItem(LOCAL_STORAGE.SIGNIN) || '{}')
      : null;

    this.loginForm = new FormGroup({
      username: new FormControl(
        signIn ? signIn.username : null,
        Validators.required
      ),
      password: new FormControl(
        signIn ? signIn.password : null,
        Validators.required
      ),
      rememberUser: new FormControl(signIn !== null),
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  private isEmail(email: string) {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
    } else {
      const user: User = new User('', '', '', '', new Date(), '', '', '', 0, 0);
      const username: string = this.loginForm.value.username;
      if (this.isEmail(username)) {
        user.email = username;
      } else {
        user.username = username;
      }
      user.password = this.loginForm.value.password;

      // Store the sigm in data in localStorage
      if (this.loginForm.value.rememberUser) {
        const signin: any = {
          username,
          password: this.loginForm.value.password,
        };
        localStorage.setItem(LOCAL_STORAGE.SIGNIN, JSON.stringify(signin));
      } else {
        localStorage.removeItem(LOCAL_STORAGE.SIGNIN);
      }

      this.userEventEmiter.emit(user);
    }
  }
}
