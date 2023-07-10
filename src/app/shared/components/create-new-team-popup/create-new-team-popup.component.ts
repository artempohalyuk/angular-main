import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Actions } from '@ngneat/effects-ng';
import { Observable, map, tap } from 'rxjs';
import { AppRepository, IStoreData, createUserTeam } from 'src/app/store';
import { IUserTeam } from '../../models/user-team.model';

@Component({
  selector: 'app-create-new-team-popup',
  templateUrl: './create-new-team-popup.component.html',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule]
})
export class CreateNewTeamPopupComponent implements OnInit {
  newUserTeamForm!: FormGroup;
  userTeam$: Observable<IStoreData<IUserTeam> | null> = this._appRepository.userTeam$;
  errorMessage!: string;

  constructor(
    private _appRepository: AppRepository,
    private _actions: Actions,
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<CreateNewTeamPopupComponent>,
  ) {}

  ngOnInit(): void {
    this.newUserTeamForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]]
    })

    this.userTeam$.subscribe(
      (res) => {
        console.log(res);
      }
    )
  }

  createTeam(): void {
    const formValue = this.newUserTeamForm.getRawValue();
  
    this._actions.dispatch(createUserTeam(formValue.name));
  }

  onClosePopup() {
    this._dialogRef.close();
  }
}