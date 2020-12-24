import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ProgressbarService } from '../services/progressbar.service'

export interface ID {
  storedAppID: string;
}

@Component({
  selector: 'app-google-id-chips',
  templateUrl: './google-id-chips.component.html',
  styleUrls: ['./google-id-chips.component.scss']
})
export class GoogleIdChipsComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  //Table component instance for running the progress bar

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  androidServerUrl = 'http://api.zaibatsu.fyi/api/android';
  ids: ID[] = [];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add an ID
    if ((value || '').trim()) {
      this.ids.push({storedAppID: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(id: ID): void {
    const index = this.ids.indexOf(id);

    if (index >= 0) {
      this.ids.splice(index, 1);
    }
  }

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private progressbarService: ProgressbarService
    ) {}

  sendAndroidRequest() {
    const ids = this.ids;
    // debugger;
    this.http.post<ID>(this.androidServerUrl, ids)
      .pipe(
        catchError(error => {
          console.log('Sending data failed')
          return throwError(error)
        })
      ).subscribe(ids => console.log(ids));
  }

  openSnackBar() {
    this._snackBar.open('Zaibatsu bot is fetching data, it will appear in the table below. Normally it takes 25-30 seconds for each app update', 'Got it', {
      duration: 10000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  ngOnInit(): void {
    
  }

  callProgressBar(){
    this.progressbarService.sendClickEvent();
    }

}
