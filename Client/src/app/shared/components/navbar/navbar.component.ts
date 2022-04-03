import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { User } from 'src/app/core/models/user.model';

// ViewEncapsulation
@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss'],
})
export class NavbarComponent {
  public isOpen: boolean = false;
  public actionName: string = 'Open navigation menu.';

  @Input() user: User | null = null;

  @Output() public logoutEventEmitter: EventEmitter<boolean> =
    new EventEmitter();

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const actualWidth = event.target.innerWidth;
    if (actualWidth >= 1000) {
      this.isOpen = false;
      this.actionName = 'Open navigation menu.';
    }
  }

  public eventToggle() {
    if (!this.isOpen) {
      this.actionName = 'Close navigation menu.';
    } else {
      this.actionName = 'Open navigation menu.';
    }
    this.isOpen = !this.isOpen;
  }

  public logout() {
    this.logoutEventEmitter.emit(true);
  }
}
