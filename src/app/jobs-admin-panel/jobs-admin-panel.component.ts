import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core'
import { AuthService } from '../services/auth/auth.service'
import { MatDialog } from '@angular/material/dialog'
import { MediaMatcher } from '@angular/cdk/layout';


//for the API request
import { Job } from '../models/job'
import { HttpClient } from '@angular/common/http';
import { catchError, filter, switchMap, tap, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

type JobResult = Array<Job>

@Component({
  selector: 'app-jobs-admin-panel',
  templateUrl: './jobs-admin-panel.component.html',
  styleUrls: ['./jobs-admin-panel.component.scss']
})
export class JobsAdminPanelComponent implements OnInit, OnDestroy {

  jobServerUrl = 'https://api.zaibatsu.fyi/api/jobs';

  //table data:
  jobData: Job[] = [];
  //hardcoded data for testing:
  // {
  //   os: '123', 
  //   storedAppID: 'asd', 
  //   appNameText: '132', 
  //   type: 'kh', 
  //   addedToQueue: true, 
  //   zeroSubscribers: 'rrr',
  //   backendResult: '123', 
  //   puppeteerChromeResult: 'asd', 
  //   puppeteerFirefoxResult: '132', 
  //   newNotes: true, 
  //   reportSent: true, 
  //   dbUpdated: 'rrr',
  //   invalid: true, 
  //   scheduled: true, 
  //   sentToWS: true
  // },
  // {
  //   os: '123', 
  //   storedAppID: 'asd', 
  //   appNameText: '132', 
  //   type: 'kh', 
  //   addedToQueue: true, 
  //   zeroSubscribers: 'rrr',
  //   backendResult: '123', 
  //   puppeteerChromeResult: 'asd', 
  //   puppeteerFirefoxResult: '132', 
  //   newNotes: true, 
  //   reportSent: true, 
  //   dbUpdated: 'rrr',
  //   invalid: true, 
  //   scheduled: true, 
  //   sentToWS: true
  // }

  report: Job;

  //table column names
  col_names: string[] = [
      'os',
      'storedAppID', 
      'appNameText',
      'type', 
      'addedToQueue', 
      'zeroSubscribers', 
      'backendResult', 
      'puppeteerChromeResult', 
      'newNotes', 
      'reportSent', 
      'dbUpdated', 
      'invalid', 
      'scheduled', 
      'sentToWS',
      'updatedAt'
    ];
  //table data exported:
  table_data = this.jobData;



  getJobs() {
    console.log('Trying to get jobs')

        const jobResult = this.http.get<JobResult>(
          this.jobServerUrl, 
          {
            withCredentials: true,
            observe: 'body',
            responseType: 'json'
          }
        )
        console.log('job result: ', jobResult)
        return jobResult
  }


  //for responsiveness
  mobileQuery: MediaQueryList
  private _mobileQueryListener: () => void;

  constructor(
    private http: HttpClient,
    public authService: AuthService,
    public dialog: MatDialog,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 760px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }


  ngOnInit() {
    this.getJobs().subscribe((result)=>{
      this.table_data = result
    })
    console.log('table data: ', this.table_data)

  }

  // .subscribe((result)=>{    
  //   this.dataSource  =  result.body


  // ).subscribe((data) => {
  //   console.log('got list: ', data)
  //   this.table_data = data
  //   console.log('table data: ', this.table_data)
  // })

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener)

  }

}