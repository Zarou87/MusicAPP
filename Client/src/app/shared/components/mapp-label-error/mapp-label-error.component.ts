import { Component, Input } from '@angular/core';

import {
  faExclamationCircle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-mapp-label-error',
  templateUrl: './mapp-label-error.component.html',
  styleUrls: ['./mapp-label-error.component.scss'],
})
export class MAppLabelErrorComponent {
  warning = faExclamationCircle;
  error = faTimes;

  @Input() condition: boolean = false;
  @Input() iconType: number = 0;
}
