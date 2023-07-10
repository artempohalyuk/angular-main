import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Observable, map } from 'rxjs';
import { INews } from '@models';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { Actions } from '@ngneat/effects-ng';
import { AppRepository, loadNews } from 'src/app/store';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgxPaginationModule, CommonModule]
})
export class NewsComponent implements OnInit {
  p: number = 1;
  newsList$: Observable<INews[] | null> = this._appRepository.news$.pipe(map((res) => res?.data ?? null));
  newsLoader$: Observable<boolean> = this._appRepository.news$.pipe(map((res) => res?.loading ?? false));

  constructor(
    private actions: Actions,
    private _appRepository: AppRepository
  ) { }

  ngOnInit() {
    this.actions.dispatch(loadNews());
  }

}
