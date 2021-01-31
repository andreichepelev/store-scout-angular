import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ReportsService } from '../services/reports/reports.service'
import { Report } from '../models/report'
import { Subscription } from 'rxjs'
import { ProgressbarService } from '../services/progressbar/progressbar.service'
import { ButtonStateService } from '../services/buttonState/button-state.service'
import { TableDataSenderService } from '../services/tableDataSender/table-data-sender.service'


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
    col_names: string[] = ['os','appNameText', 'releaseDateText', 'versionText', 'releaseNotesText'];
    //table data exported:
    table_data = this.reportData;

    mobileQuery: MediaQueryList
    private _mobileQueryListener: () => void;
  
    constructor(
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