import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AuthService } from 'src/app/services';
import { IUser } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.authService.getCurrentUser$().pipe(
      switchMap(
        (currentUser: IUser | null) => {
          if (!currentUser) {
            return this.router.navigateByUrl('http://auth.microfrontend.com', { skipLocationChange: true });
          }

          return of(true);
        }
      )
    )
  }
}
