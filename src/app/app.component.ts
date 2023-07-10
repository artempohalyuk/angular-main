import { Component, OnDestroy, OnInit } from '@angular/core';
import { ErrorsNotifierService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private _errorsNotifierService: ErrorsNotifierService) {}

  ngOnInit(): void {
    this._errorsNotifierService.run();
  }

  ngOnDestroy(): void {
    this._errorsNotifierService.stop();
  }
}
