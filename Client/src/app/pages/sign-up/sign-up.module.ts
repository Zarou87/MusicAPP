import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { SignUpRoutingModule } from './sign-up-routing.module';
import {
  RECAPTCHA_SETTINGS,
  RecaptchaFormsModule,
  RecaptchaModule,
  RecaptchaSettings,
} from 'ng-recaptcha';

import { SignUpComponent } from './sign-up.component';
import { environment } from 'src/environments/environment';
import { SignUpService } from './services/sign-up.service';

@NgModule({
  imports: [
    CommonModule,
    SignUpRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SharedModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  exports: [],
  declarations: [SignUpComponent, SignUpFormComponent],
  providers: [
    SignUpService,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    },
  ],
})
export class SignUpModule {}
