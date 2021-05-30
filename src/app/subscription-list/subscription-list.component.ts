import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { ConfirmRemovalComponent } from '../confirm-removal/confirm-removal.component'
import { MatDialog } from '@angular/material/dialog'

//for the API request
import { HttpClient } from '@angular/common/http';
import { catchError, filter, switchMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';


// export interface AppName {
//   appNameText: string;
// }

interface AppUpdate {
  "user": string[],
  "_id": string,
  "storedAppID": string,
  "appNameText": string,
  "createdAt": string,
  "os": string,
  "releaseDateText": string,
  "releaseNotesText": string,
  "updatedAt": string,
  "versionText": string
}

type AppUpdateResult = Array<AppUpdate>

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

  appList = []
  // stringArray = this.appList.map(item => item.appNameText)


  deleteSelected() {
    var selectedList: string[] = this.selectionList.selectedOptions.selected.map(s => s.value)
    var diff = this.appList.filter(el => !selectedList.includes(el))
    this.appList = diff
  }

  openConfirmationDialog() {
    this.dialog.open(ConfirmRemovalComponent, {});
  }

  getApps() {
    console.log('Getting apps per user')
    this.afAuth.authState.pipe(
      filter(Boolean),
      switchMap(() => {
        return this.http.get<AppUpdateResult>(
          this.subscribeServerUrl, 
          {
            withCredentials: true,
            observe: 'body',
            responseType: 'json'
          }
        )    
      }),
      catchError(error => {
        console.log('Getting app data failed')
        return throwError(error)
      })
    ).subscribe((data) => {
      console.log('response is: ', data)
      data.forEach(element => this.appList.push(element.appNameText));
      console.log('app array: ', this.appList)
    })
  }

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    public afAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.getApps()
  }

}