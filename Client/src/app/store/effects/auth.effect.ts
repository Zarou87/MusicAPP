import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { ROUTE_PATH } from 'src/app/core/const/app.conts';
import { ApiMusicAppService } from 'src/app/core/services/api-musicApp/api-musicApp.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { AuthActionTypes } from '../actions/auth.action';

@Injectable()
export class AuthEffects {
  logIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.LOGIN),
      mergeMap((action: any) =>
        this.apiMAppService.login(action.payload).pipe(
          map((resp) => {
            this.authService.setAuthToken(resp.token);
            return {
              type: AuthActionTypes.AUTH_SUCCESS,
              user: resp.user,
            };
          }),
          catchError((error) => of({ type: AuthActionTypes.AUTH_ERROR, error }))
        )
      )
    )
  );

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.SIGNUP),
      mergeMap((action: any) =>
        this.apiMAppService.register(action.payload).pipe(
          map((resp) => {
            this.authService.setAuthToken(resp.token);
            return {
              type: AuthActionTypes.AUTH_SUCCESS,
              user: resp.user,
            };
          }),
          catchError((error) => of({ type: AuthActionTypes.AUTH_ERROR, error }))
        )
      )
    )
  );

  authComplete$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.AUTH_SUCCESS),
        tap(() => this.router.navigateByUrl(ROUTE_PATH.HOME))
      ),
    { dispatch: false }
  );

  logOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.LOGOUT),
      map(() => ({ type: AuthActionTypes.LOGOUT_SUCCESS }))
    )
  );

  logOutComplete$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.LOGOUT_SUCCESS),
        tap(() => this.router.navigateByUrl(ROUTE_PATH.HOME))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private apiMAppService: ApiMusicAppService,
    private authService: AuthService,
    private router: Router
  ) {}
}
