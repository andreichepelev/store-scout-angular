import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { ConfirmRemovalComponent } from '../confirm-removal/confirm-removal.component'
import { MatDialog } from '@angular/material/dialog'

//for the API request
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
export interface ID {
  storedAppID: string;
}

export interface AppName {
  appNameText: string;
}

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.scss']
})
export class SubscriptionListComponent implements OnInit {


  @ViewChild('apps') selectionList: MatSelectionList

  areSelected = false

  subscribeServerUrl = 'http://api.zaibatsu.fyi/api/getapps';

  onSelectionChange() {
    if (this.selectionList.selectedOptions.selected.length > 0) {
      this.areSelected = true
    }
    else {
      this.areSelected = false
    }
  }

  appList: AppName[] = [{appNameText: 'Facebook'}, {appNameText: 'Instagram'}]
  stringArray = this.appList.map(item => item.appNameText)


  deleteSelected() {
    var selectedList: string[] = this.selectionList.selectedOptions.selected.map(s => s.value)
    var diff = this.stringArray.filter(el => !selectedList.includes(el))
    this.stringArray = diff
  }

  openConfirmationDialog() {
    this.dialog.open(ConfirmRemovalComponent, {});
  }

  getApps() {
    console.log('getting apps per user')
    this.http.get<ID>(
      this.subscribeServerUrl, 
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .pipe(
        catchError(error => {
          console.log('Getting app data failed')
          return throwError(error)
        })
      )
  }



  constructor(
    public dialog: MatDialog,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getApps()
  }

}