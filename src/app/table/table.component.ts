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


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {

    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';


    //for the Subscription button
    notSubscribed = true

    //for the progress bar
    isLoading = false
    clickEventsubscription: Subscription
    duration: number
    subscribeServerUrl = 'http://api.zaibatsu.fyi/api/subscribe';


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

    openSuccessSnackBar(app) {
      this._snackBar.open(`Successfully subscribed to ${app}!`, 'Got it', {
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


    subscribeToApp(appNameText) {
      // console.log(`App name: ${storedAppID}`)
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
            this.notSubscribed = false
            return throwError(error)
          })
        ).subscribe(appNameText => this.openSuccessSnackBar(appNameText));
    }


  ngOnInit() {
    
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
        });
  
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener)
    this.sub.unsubscribe()
    this.clickEventsubscription.unsubscribe()
  }

}