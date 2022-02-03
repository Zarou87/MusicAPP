import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import {
  ConfirmMailValidator,
  DayValidator,
} from 'src/app/core/validators/validators';
import { AGE_AUTH } from 'src/app/core/const/app.conts';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
})
export class SignUpFormComponent implements OnInit {
  public signUpForm: FormGroup = new FormGroup({});
  public currentYear: number;
  public patternEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  public patternNumeric = /^\d+$/;

  @Output() public userEventEmiter: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.currentYear = moment().year();
  }

  ngOnInit(): void {
    this.signUpForm = new FormGroup(
      {
        email: new FormControl(null, [
          Validators.required,
          Validators.pattern(this.patternEmail),
        ]),
        confirmEmail: new FormControl(null),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
        ]),
        username: new FormControl(null, Validators.required),
        birthday: new FormGroup({
          day: new FormControl(null, Validators.required),
          month: new FormControl('Mes', Validators.required),
          year: new FormControl(null, [
            Validators.required,
            Validators.pattern(this.patternNumeric),
            Validators.min(this.currentYear - AGE_AUTH.MAX),
            Validators.max(this.currentYear - AGE_AUTH.MIN),
          ]),
        }),
        gender: new FormControl(null, Validators.required),
        subsNewsOffers: new FormControl(false),
        borrowPersonalData: new FormControl(false),
        recaptcha: new FormControl(null, Validators.required),
      },
      {
        validators: [ConfirmMailValidator, DayValidator],
      }
    );
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get confirmEmail() {
    return this.signUpForm.get('confirmEmail');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get username() {
    return this.signUpForm.get('username');
  }

  get birthday(): FormGroup {
    return this.signUpForm.get('birthday') as FormGroup;
  }

  get day() {
    return this.birthday.get('day');
  }

  get month() {
    return this.birthday.get('month');
  }

  get year() {
    return this.birthday.get('year');
  }

  get gender() {
    return this.signUpForm.get('gender');
  }

  get recaptcha() {
    return this.signUpForm.get('recaptcha');
  }

  onSubmit() {
    // console.log(this.signUpForm);
    if (!this.signUpForm.valid) {
      this.signUpForm.markAllAsTouched();
    } else {
      const values: any = this.signUpForm.value;
      const vDate: any = this.birthday.value;
      const user: User = new User(
        '',
        values.username,
        values.gender,
        values.email,
        moment(
          `${vDate.day}/${vDate.month}/${vDate.year}, 12:00`,
          'DD/MM/YYYY, HH:mm'
        )
          .add(1, 'months')
          .toDate(),
        values.password,
        '',
        '',
        values.subsNewsOffers ? 1 : 0,
        values.borrowPersonalData ? 1 : 0
      );

      this.userEventEmiter.emit(user);
    }
  }
}
