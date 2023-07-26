import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideEffectsManager, provideEffects } from '@ngneat/effects-ng';

import { ApiService, ErrorsNotifierService } from '../services';
import { AuthInterceptor, HttpErrorHandlerInterceptor } from './interceptors';
import { HeaderComponent } from './components';
import { AppRepository, AppEffects } from '../store';

@NgModule({
  imports: [
    HeaderComponent,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [
    ApiService,
    ErrorsNotifierService,
    AppRepository,
    provideEffectsManager(),
    provideEffects(AppEffects),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorHandlerInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule { }
