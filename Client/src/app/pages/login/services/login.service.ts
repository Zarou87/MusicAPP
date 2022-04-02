import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/core/models/user.model';
import { ApiMusicAppService } from 'src/app/core/services/api-musicApp/api-musicApp.service';
import { logIn } from 'src/app/store/actions/auth.action';
import { AppState } from 'src/app/store/app.states';

@Injectable()
export class LoginService {
  constructor(
    private apiMusicAppService: ApiMusicAppService,
    private store: Store<AppState>
  ) {}

  login(payload: User) {
    this.store.dispatch(logIn({ payload }));
  }
}
