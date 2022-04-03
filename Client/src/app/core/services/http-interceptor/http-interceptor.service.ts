import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ROUTE_PATH } from '../../const/app.conts';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    public toasterService: ToastrService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: string | null = this.authService.getAuthToken();

    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: token,
        },
      });
    }

    return next.handle(request).pipe(
      tap((evt) => {
        this.processSuccess(evt);
      }),
      catchError((err: HttpErrorResponse): Observable<HttpEvent<any>> => {
        this.processError(err);
        return throwError(() => err);
      })
    );
  }

  private processSuccess(evt: HttpEvent<any>) {
    if (evt instanceof HttpResponse) {
      console.log('evt httpInterceptor', evt);
      // DO IN AUTH EFFECTS
      // if (evt.body && evt.body.token) {
      //   this.authService.setAuthToken(evt.body.token);
      // }

      // if (evt.body && evt.status === 200 && evt.statusText === 'OK') {
      //   this.toasterService.success('Hello world!', 'Toastr fun!');
      // }
    }
  }

  private processError(err: HttpErrorResponse): void {
    this.toasterService.error(err.error.message, err.error.title, {
      positionClass: 'toast-top-right',
    });
    if (err.status === 401) {
      this.router.navigateByUrl(ROUTE_PATH.LOGIN);
    }
  }
}
