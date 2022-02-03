import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mapp-alert',
  templateUrl: './mapp-alert.component.html',
  styleUrls: ['./mapp-alert.component.scss'],
})
export class MAppAlertComponent {
  @Input() type: 'success' | 'warning' | 'danger' | 'info' = 'success';

  constructor() {}
}
