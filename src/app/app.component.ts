import { Component, OnDestroy, OnInit } from '@angular/core';

import { AuthService, ErrorsNotifierService } from './services';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  public get user() {
    return this._authService.getCurrentUser();
  }

  isLoading: boolean = false;

  constructor(
    private _errorsNotifierService: ErrorsNotifierService,
    private _authService: AuthService,
    private _router: Router
  ) {
    _router.events.subscribe(
      (event): void => {
        if (event instanceof RouteConfigLoadStart) {
          this.isLoading = true;
        } else if (event instanceof RouteConfigLoadEnd) {
          this.isLoading  = false;
        }
      }
    );
  }

  ngOnInit(): void {
    this._errorsNotifierService.run();
  }

  ngOnDestroy(): void {
    this._errorsNotifierService.stop();
  }
}
