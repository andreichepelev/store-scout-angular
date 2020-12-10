import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface ID {
  storedAppID: string;
}

@Component({
  selector: 'app-apple-id-chips',
  templateUrl: './apple-id-chips.component.html',
  styleUrls: ['./apple-id-chips.component.scss']
})
export class AppleIdChipsComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  iOSServerUrl = 'http://api.zaibatsu.fyi/api/ios';
  ids: ID[] = [
  ];

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

  sendIOSRequest() {
    const ids = this.ids;
    // debugger;
    this.http.post<ID>(this.iOSServerUrl, ids)
      .pipe(
        catchError(error => {
          console.log('Sending data failed')
          return throwError(error)
        })
      ).subscribe(ids => console.log(ids));
  }


  // $(document).ready(function(){
  //   var iOSAppID;
  //   $("form[class=ios]").submit(function(){
  //     iOSAppID=$("#ios").val();
  //     $.post("/api/ios",{storedAppID: iOSAppID}, function(data){
  //     });
  //   });
  // });


  ngOnInit(): void {
  }

}

