import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ROUTE_PATH } from '../../const/app.conts';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

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
      catchError((err: HttpErrorResponse): Observable<HttpEvent<any>> => {
        this.processError(err);
        return throwError(() => err);
      })
    );
  }

  private processError(err: HttpErrorResponse): void {
    if (err.status === 401) {
      this.router.navigateByUrl(ROUTE_PATH.LOGIN);
    }
  }
}
