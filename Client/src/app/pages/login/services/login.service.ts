import { Injectable } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { ApiMusicAppService } from 'src/app/core/services/api-musicApp/api-musicApp.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Injectable()
export class LoginService {
  constructor(
    private apiMusicAppService: ApiMusicAppService,
    private authService: AuthService
  ) {}

  login(req: User) {
    this.apiMusicAppService.login(req).subscribe((res) => {
      console.log(res);

      // const errorMsg = <any>error;

      // if (errorMsg != null) {
      //   const message: string = JSON.parse(error._body);
      //   console.log('message', message);
      // }
    });
  }
}
