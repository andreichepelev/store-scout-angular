import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ReportsService } from '../services/reports/reports.service'
import { Report } from '../models/report'
import { Subscription } from 'rxjs'
import { ProgressbarService } from '../services/progressbar/progressbar.service'
import { ButtonStateService } from '../services/buttonState/button-state.service'
import { TableDataSenderService } from '../services/tableDataSender/table-data-sender.service'

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

    subscribeToApp(storedAppID) {
      // console.log(`App name: ${storedAppID}`)
      this.http.post<ID>(
        this.subscribeServerUrl, 
        JSON.stringify({storedAppID}), 
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
        .pipe(
          catchError(error => {
            console.log('Sending data failed')
            return throwError(error)
          })
        ).subscribe(storedAppID => console.log(`App: ${{storedAppID}}`));
    }

    // sendAndroidRequest() {
    //   const ids = this.ids;
    //   // debugger;
    //   this.http.post<ID>(this.androidServerUrl, ids, { withCredentials: true })
    //     .pipe(
    //       catchError(error => {
    //         console.log('Sending data failed')
    //         return throwError(error)
    //       })
    //     ).subscribe(ids => console.log(ids));
    // }

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