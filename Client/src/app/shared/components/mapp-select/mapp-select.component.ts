import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'mapp-select',
  templateUrl: './mapp-select.component.html',
  styleUrls: ['./mapp-select.component.scss'],
})
export class MAppSelectComponent {
  down = faChevronDown;

  @Input() items: string[] = [];
  @Input() formGroupParent: FormGroup = new FormGroup({});
  @Input() controlName: string = '';
  @Input() defaultValue: string | null = null;

  constructor() {}

  get control() {
    return this.formGroupParent.get(this.controlName);
  }
}
