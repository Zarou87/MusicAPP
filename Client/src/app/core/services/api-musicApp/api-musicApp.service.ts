import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserResponse } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class ApiMusicAppService {
  public url: string;
  constructor(private http: HttpClient) {
    this.url = environment.api_url;
  }

  public login(reqObj: User): Observable<UserResponse> {
    return this.http
      .post(`${this.url}/auth/sign-in`, reqObj)
      .pipe(map((resp: any) => resp));
  }

  public register(reqObj: User): Observable<UserResponse> {
    return this.http
      .post(`${this.url}/auth/sign-up`, reqObj)
      .pipe(map((resp: any) => resp.body));
  }
}
