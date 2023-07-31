import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { CookieHelper, StorageHelper } from './app/utils';
import { StorageKey } from './app/shared';
import { environment } from '@env';

const cookieJwt = CookieHelper.getCookieValue('jwt');
const jwt = StorageHelper.getItemAsString(localStorage, StorageKey.Token);

if (cookieJwt || jwt) {
  if (!jwt) {
    StorageHelper.setItem(localStorage, StorageKey.Token, cookieJwt);
  }

  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
} else {
  window.location.href = `${environment.authUrl}/logout`;
}



