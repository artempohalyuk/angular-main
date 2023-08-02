import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { AuthGuard } from './shared/guards';
import { CoreModule } from './core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {
        path: '',
        canActivate: [AuthGuard],
        children: [
          { path: '', loadComponent: () => import('./pages/home').then(m => m.HomeComponent) },
          { path: 'management', loadComponent: () => import('./pages/management').then(m => m.ManagementComponent) },
          { path: 'news', loadChildren: () => import('./pages/news/news.routes').then(m => m.NEWS_ROUTES) }
        ],
      },
    ]),
    CoreModule,
    MatProgressSpinnerModule,
    MatDialogModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
