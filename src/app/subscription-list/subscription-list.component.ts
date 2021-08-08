import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

//for the API request
import { HttpClient } from '@angular/common/http';
import { catchError, filter, switchMap, tap, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../services/auth/auth.service'


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

  //Getting the apps:

  subscribeServerUrl = 'https://api.zaibatsu.fyi/api/getapps';
  appList = []


  // this.socket = this.authService.authState.pipe(
  //   tap((state) => console.log('[ReportService] authSate', state)),
  //   filter((state) => state),
  //   map(() => {
  //     console.log('[ReportService] Creating new socket, token')
  //     return io(SOCKET_ENDPOINT, {withCredentials: true});
  //   }),
  //   shareReplay(1)
  // )

  getApps() {
    console.log('Trying to get apps per user')
    this.authService.authState.pipe(
      tap((state) => console.log('[Subscription list] authState', state)),
      filter((state) => state),
      map(() => {
        console.log('[Subscription list] Getting apps per user')
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
      data.forEach(element => this.appList.push(element));
    })
  }


  // getApps() {
  //   console.log('Getting apps per user')
  //   this.afAuth.authState.pipe(
  //     filter(Boolean),
  //     switchMap(() => {
  //       return this.http.get<AppUpdateResult>(
  //         this.subscribeServerUrl, 
  //         {
  //           withCredentials: true,
  //           observe: 'body',
  //           responseType: 'json'
  //         }
  //       )    
  //     }),
  //     catchError(error => {
  //       console.log('Getting app data failed')
  //       return throwError(error)
  //     })
  //   ).subscribe((data) => {
  //     data.forEach(element => this.appList.push(element));
  //   })
  // }

  //Selection:

  areSelected = false

  onSelectionChange() {
    if (this.selectionList.selectedOptions.selected.length > 0) {
      this.areSelected = true
    }
    else {
      this.areSelected = false
    }
  }

  //Unsubscription:

  unsubscribeUrl = 'https://api.zaibatsu.fyi/api/unsubscribe'

  unsubscribeFromSelected() {
    var selectedList: string[] = this.selectionList.selectedOptions.selected.map(s => s.value)
    console.log('selectedList for unsubscribe: ', selectedList)
    this.http.post(this.unsubscribeUrl, selectedList, { withCredentials: true })
      .pipe(
        catchError(error => {
          console.log('Sending unsubscription data failed')
          return throwError(error)
        })
      ).subscribe(ids => console.log('sent to unsubscribe: ', selectedList));
    var diff = this.appList.filter(el => !selectedList.includes(el))
    this.appList = diff
  }


  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  openSnackBar() {
    this._snackBar.open('You have successfully unsubscribed from selected apps', 'Got it', {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  constructor(
    private http: HttpClient,
    public afAuth: AngularFireAuth,
    private _snackBar: MatSnackBar,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getApps()
  }

}