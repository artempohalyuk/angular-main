import { NgModule } from '@angular/core';
import { ApiService, ErrorsNotifierService } from '../services';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor, HttpErrorHandlerInterceptor } from './interceptors';
import { FooterComponent, HeaderComponent } from './components';
import { provideEffectsManager, provideEffects } from '@ngneat/effects-ng';
import { AppRepository, AppEffects } from '../store';

@NgModule({
  imports: [
    HeaderComponent,
    FooterComponent
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
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule { }
