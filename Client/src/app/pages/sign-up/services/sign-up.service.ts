import { Injectable } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { ApiMusicAppService } from 'src/app/core/services/api-musicApp/api-musicApp.service';

@Injectable()
export class SignUpService {
  constructor(private apiMusicAppService: ApiMusicAppService) {}

  signUp(req: User) {
    this.apiMusicAppService.register(req).subscribe((res) => {
      console.log(res);

      // const errorMsg = <any>error;

      // if (errorMsg != null) {
      //   const message: string = JSON.parse(error._body);
      //   console.log('message', message);
      // }
    });
  }
}
