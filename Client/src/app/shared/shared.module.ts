import { NgModule } from '@angular/core';
import { MAppAlertComponent } from './components/mapp-alert/mapp-alert.component';
import { MAppLabelErrorComponent } from './components/mapp-label-error/mapp-label-error.component';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAppInputDateComponent } from './components/mapp-date-input/mapp-date-input.component';
import { MAppSelectComponent } from './components/mapp-select/mapp-select.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    NavbarComponent,
    MAppAlertComponent,
    MAppLabelErrorComponent,
    MAppInputDateComponent,
    MAppSelectComponent,
  ],
  declarations: [
    NavbarComponent,
    MAppAlertComponent,
    MAppLabelErrorComponent,
    MAppInputDateComponent,
    MAppSelectComponent,
  ],
  providers: [],
})
export class SharedModule {}
