import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { MONTHS } from 'src/app/core/const/date.conts';

@Component({
  selector: 'mapp-date-input',
  templateUrl: './mapp-date-input.component.html',
  styleUrls: ['./mapp-date-input.component.scss'],
})
export class MAppInputDateComponent implements OnInit {
  dateForm: FormGroup = new FormGroup({});
  months: string[] = MONTHS;

  constructor(private ctrlContainer: FormGroupDirective) {}

  ngOnInit(): void {
    this.dateForm = this.ctrlContainer.form;
  }

  get day() {
    return this.dateForm.get('day');
  }

  get year() {
    return this.dateForm.get('year');
  }

  get dateFormValues() {
    return this.dateForm.value;
  }
}
