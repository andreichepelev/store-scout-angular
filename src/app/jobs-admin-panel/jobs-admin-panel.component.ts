import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core'
import { AuthService } from '../services/auth/auth.service'
import { MatDialog } from '@angular/material/dialog'
import { MediaMatcher } from '@angular/cdk/layout';
import {MatTableDataSource} from '@angular/material/table';



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
      'scrapingError',
      'scheduled', 
      'sentToWS',
      'updatedAt'
    ];
  //table data exported:
  table_data = new MatTableDataSource<Job>(this.jobData)


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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.table_data.filter = filterValue.trim().toLowerCase();
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
      this.table_data.data = result
    })
    console.log('table data: ', this.table_data)

  }


  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener)

  }

}