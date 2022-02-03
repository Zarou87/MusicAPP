import {
  AbstractControl,
  //   ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import * as moment from 'moment';

export function ConfirmMailValidator(
  control: AbstractControl
): ValidatorFn | null {
  if (control) {
    const email = control.get('email');
    const matchingEmail = control.get('confirmEmail');

    if (!email || !matchingEmail) {
      return null;
    }

    if (
      email.value !== matchingEmail.value &&
      !(isInputEmpty(email.value) && isInputEmpty(matchingEmail.value))
    ) {
      matchingEmail.setErrors({ notSame: true });
    } else if (isInputEmpty(matchingEmail.value)) {
      matchingEmail.setErrors({ required: true });
    } else {
      matchingEmail.setErrors(null);
    }
  }

  return null;
}

export function DayValidator(control: AbstractControl): ValidatorFn | null {
  if (control) {
    const month = control.get('birthday')?.get('month');
    const year = control.get('birthday')?.get('year');
    const day = control.get('birthday')?.get('day');

    if (!year || !month) {
      return null;
    }

    if (day) {
      if (isInputEmpty(day.value)) {
        day.setErrors({ required: true });
      } else if (!/^\d+$/.test(day.value)) {
        day.setErrors({ pattern: true });
      } else {
        const mm =
          month.value.length !== 1
            ? Number(month.value) + 1
            : `0${Number(month.value) + 1}`;
        const days = moment(`${year.value}-${mm}`, 'YYYY-MM').daysInMonth();
        if (day.value < 1 || day.value > days) {
          day.setErrors({ invalidDay: true });
        }
      }
    }
  }

  return null;
}

function isInputEmpty(str: string): boolean {
  return str == null || str === '';
}
