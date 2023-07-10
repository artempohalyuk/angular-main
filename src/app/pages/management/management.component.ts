import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Observable, map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { IPlayer } from '@models';
import { ApiService, AuthService } from 'src/app/services';
import { CreateNewTeamPopupComponent } from 'src/app/shared/components';
import { NgxPaginationModule } from 'ngx-pagination';
import { NameFilterPipe, PositionFilterPipe } from './pipes';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRepository, loadActivePlayers, loadUserTeam } from 'src/app/store';
import { Actions } from '@ngneat/effects-ng';


@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgxPaginationModule, NameFilterPipe, PositionFilterPipe, CommonModule, FormsModule]
})
export class ManagementComponent implements OnInit {
  p: number = 1;
  searchTerm!: string;
  selectedPosition!: string;
  activePlayers$: Observable<IPlayer[] | null> = this._appRepository.activePlayers$.pipe(map((res) => res?.data ?? null));
  activePlayersLoader$: Observable<boolean> = this._appRepository.newsDetails$.pipe(map((res) => res?.loading ?? false));
  userTeam$: Observable<any> = this._appRepository.userTeam$.pipe(map((res) => res?.data ?? null));
  userTeamLoader$: Observable<boolean> = this._appRepository.userTeam$.pipe(map((res) => res?.loading ?? false));

  constructor(
    private _dialog: MatDialog,
    private _actions: Actions,
    private _appRepository: AppRepository,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this._actions.dispatch(loadActivePlayers());
    
    debugger
    if (this._authService.getCurrentUser()?.teamId) {
      this._actions.dispatch(loadUserTeam());
    }
  }

  onCreateNewTeam(): void {
    const dialogRef = this._dialog.open(CreateNewTeamPopupComponent, {
      width: '400px',
      disableClose: true,
      autoFocus: true
    });
  }

  addPlayerToTeam(player: any): void {}

  removePlayerFromTeam(player: any): void {}
}
