import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService, ErrorsNotifierService } from 'src/app/services';
import { HttpStatus } from 'src/app/shared/enums';

@Injectable()
export class HttpErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private _authService: AuthService,
    private _errorsNotifierService: ErrorsNotifierService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(
        (response: any): Observable<never> => {
          if (response instanceof HttpErrorResponse) {
            switch (response.status) {
              case HttpStatus.Unauthorized: {
                this._authService.clear();
                window.location.href = 'http://auth.microfrontend.com/logout';
                break;
              }

              case HttpStatus.BadRequest: {
                return throwError(() => response);
              }
            }
          }

          this._errorsNotifierService.dispatchErrors(response);
          return throwError(() => response);
        },
      ),
    );
  }
}
