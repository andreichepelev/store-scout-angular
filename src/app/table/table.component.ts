import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ReportsService } from '../services/reports/reports.service'
import { Report } from '../models/report'
import { Subscription } from 'rxjs'
import { ProgressbarService } from '../services/progressbar/progressbar.service'
import { ButtonStateService } from '../services/buttonState/button-state.service'
import { TableDataSenderService } from '../services/tableDataSender/table-data-sender.service'
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

//for sending requests
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
export interface ID {
  storedAppID: string;
}

//local storage
import { LocalStorageService } from '../services/localStorage/local-storage.service'



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {

    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';


    //for the progress bar
    isLoading = false
    clickEventsubscription: Subscription
    duration: number
    subscribeServerUrl = 'https://api.zaibatsu.fyi/api/subscribe';


    showProgressBar(x) {
      this.isLoading = true
      setTimeout(()=> {
      this.isLoading = false;
      }, x*10000)
    }

    //table data:
    reportData: Report[] = [];
    //hardcoded data for testing:
    //{os: '123', storedAppID: 'asd', appNameText: '132', versionText: 'kh', releaseDateText: 'rew', releaseNotesText: 'rrr'}
    report: Report;
    sub: Subscription;

    socket;

    //table column names
    col_names: string[] = ['os','appNameText', 'releaseDateText', 'versionText', 'releaseNotesText', 'subscribe'];
    //table data exported:
    table_data = this.reportData;

    mobileQuery: MediaQueryList
    private _mobileQueryListener: () => void;
  
    constructor(
      private localStorageService: LocalStorageService,
      private http: HttpClient,
      private _snackBar: MatSnackBar,
      private progressbarService: ProgressbarService,
      private buttonStateService: ButtonStateService,
      private tableDataSenderService: TableDataSenderService,
      changeDetectorRef: ChangeDetectorRef, 
      private reportsService: ReportsService,
      media: MediaMatcher
    ) {
      this.mobileQuery = media.matchMedia('(max-width: 760px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
    }

    openSuccessSnackBar() {
      this._snackBar.open(`Successfully subscribed to the app! You will see it in the Subscriptions tab on the left after you refresh the page. Warning: table data will be lost!`, 'Got it', {
        duration: 5000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }

    openFailSnackBar() {
      this._snackBar.open(`Couldn't subscribe to app. You are subscribed to it or have 5 subscriptions already.`, 'Got it', {
        duration: 6000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }

    openInvalidSnackBar() {
      this._snackBar.open(`You can't subscribe to an app with invalid details. Please paste its URL to the input field on the left panel once again and try getting its details again`, 'Got it', {
        duration: 6000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }


    subscribeToApp(appNameText) {
      // console.log(`App name: ${storedAppID}`)

      if (appNameText == 'n/a') {
        this.openInvalidSnackBar()
      } else {
        this.http.post<ID>(
          this.subscribeServerUrl, 
          JSON.stringify({appNameText}), 
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
          .pipe(
            catchError(error => {
              console.log('User has more than 5 subscriptions or already subscribed to this app')
              this.openFailSnackBar()
              return throwError(error)
            })
          ).subscribe(appNameText => this.openSuccessSnackBar());
      }
    }


  ngOnInit() {

    var apps = JSON.parse(this.localStorageService.getItem('apps'));

    if (apps !== null) {
      apps.forEach(element => {
        delete element.updatedAt
        delete element.user
        delete element._id
        delete element.__v
        this.reportData.push(element)
      });
    } else {
      console.log('local storage is empty')
    }

    console.log('reportData: ', this.reportData)
    

    this.clickEventsubscription = this.progressbarService.clickSubject.subscribe((x)=>{
      this.showProgressBar(x);
    })

    this.sub = this.reportsService.getReport()
        .subscribe(report => {
          console.log(report)
          this.table_data.push(report)
          this.table_data = this.table_data.map(x => x)
          console.log(this.table_data)
          this.buttonStateService.updateAppsNumber(this.table_data.length)
          this.tableDataSenderService.pushTableData(report)
          this.localStorageService.setItem('apps', JSON.stringify(this.table_data))
        });
  
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener)
    this.sub.unsubscribe()
    this.clickEventsubscription.unsubscribe()
  }

}