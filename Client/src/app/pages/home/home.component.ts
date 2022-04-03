import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  homeSubscription: Subscription = new Subscription();
  auth: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.homeSubscription = this.authService.getUser().subscribe((user) => {
      this.auth = user;
    });
  }

  ngOnDestroy(): void {
    this.homeSubscription.unsubscribe();
  }

  logOut(event: boolean) {
    if (event) {
      this.authService.logOut();
    }
  }
}
