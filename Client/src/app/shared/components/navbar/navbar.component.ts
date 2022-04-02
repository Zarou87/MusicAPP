import { Component, HostListener, Input } from '@angular/core';

// ViewEncapsulation
@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss'],
})
export class NavbarComponent {
  public isOpen: boolean = false;
  public actionName: string = 'Open navigation menu.';

  @Input() isAuthenticated: boolean = false;

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
}
