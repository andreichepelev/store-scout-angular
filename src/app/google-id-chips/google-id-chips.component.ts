import { Component, OnInit, ViewChild } from '@angular/core';
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

import { ProgressbarService } from '../services/progressbar/progressbar.service'

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

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  androidServerUrl = 'https://api.zaibatsu.fyi/api/android';

  @ViewChild("chipList") chipList;

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
      var ids = this.ids
  
      for (let id of ids) {
        var index = ids.indexOf(id)
        if(id.storedAppID.includes('play.google.com')) {
        } else {
            this.chipList.errorState = true;
            ids.splice(index, 1)
            setTimeout(()=> {
              this.chipList.errorState = false;
              }, 5000)
          }
        }
  
      if (!ids.length) {
        console.log('No valid URLs added')
      } else {
        console.log('Google ids array: ', ids)
        // debugger;
        this.http.post<ID>(this.androidServerUrl, ids, { withCredentials: true })
          .pipe(
            catchError(error => {
              console.log('Sending data failed')
              return throwError(error)
            })
          ).subscribe(ids => console.log(ids))
          
          this.openSnackBar()
          this.callProgressBar()
          ids.splice(0,ids.length)
      }
    }

  openSnackBar() {
    this._snackBar.open('Zaibatsu bot is fetching data, it will appear in the table below. Normally it takes from 8 to 30 seconds for each app update', 'Got it', {
      duration: 10000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  ngOnInit(): void {
    
  }

  callProgressBar(){
    this.progressbarService.sendClickEvent(this.ids.length);
      }

}
