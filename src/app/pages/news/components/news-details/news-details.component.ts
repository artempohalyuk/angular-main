import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INews } from '@models';
import { Actions } from '@ngneat/effects-ng';
import { Observable, map } from 'rxjs';

import { AppRepository, loadNewsDetails } from 'src/app/store';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class NewsDetailsComponent implements OnInit {
    newsDetails$: Observable<INews | null> = this._appRepository.newsDetails$.pipe(map((res) => res?.data ?? null));
    newsDetailsLoader$: Observable<boolean> = this._appRepository.newsDetails$.pipe(map((res) => res?.loading ?? false));

    constructor(
      private actions: Actions,
      private _appRepository: AppRepository,
      private _activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
      const newsId = this._activatedRoute.snapshot.paramMap.get('id');

      this.actions.dispatch(loadNewsDetails(String(newsId)));
    }

}
