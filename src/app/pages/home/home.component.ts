import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Observable, map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { INews } from '@models';
import { CreateNewTeamPopupComponent, SidebarNewsComponent } from 'src/app/shared/components';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AppRepository, loadNews } from 'src/app/store';
import { Actions } from '@ngneat/effects-ng';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SidebarNewsComponent, CommonModule]
})
export class HomeComponent {
  newsList$: Observable<INews[] | null> = this._appRepository.news$.pipe(map((res) => res?.data ?? null));
  newsLoader$: Observable<boolean> = this._appRepository.news$.pipe(map((res) => res?.loading ?? false));

  constructor(
    private _router: Router,
    private dialog: MatDialog,
    private actions: Actions,
    private _appRepository: AppRepository) { }

  ngOnInit() {
    this.actions.dispatch(loadNews());
  }

  onCreateNewTeam(): void {
    const dialogRef = this.dialog.open(CreateNewTeamPopupComponent, {
      width: '400px',
      disableClose: true,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(
      (teamId) => {
        if (teamId) {
          this._router.navigate(['/management']);
        }
      }
    )
  }
}
