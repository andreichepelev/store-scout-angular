import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface ID {
  storedAppID: string;
}

@Component({
  selector: 'app-google-id-chips',
  templateUrl: './google-id-chips.component.html',
  styleUrls: ['./google-id-chips.component.scss']
})
export class GoogleIdChipsComponent implements OnInit {

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
    private http: HttpClient) {
  }

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

  ngOnInit(): void {
  }

//<form class="android-request-sender-form" #AndroidRequestSender=ngForm (ngSubmit)="sendAndroidRequest">

}
