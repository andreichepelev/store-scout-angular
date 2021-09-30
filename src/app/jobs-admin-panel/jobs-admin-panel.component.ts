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
import { ServerResponse } from 'http';

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
      'puppeteerFirefoxResult', 
      'newNotes', 
      'reportSent', 
      'dbUpdated', 
      'invalid', 
      'scheduled', 
      'sentToWS'
    ];
  //table data exported:
  table_data = this.jobData;


//   getData(): Observable<ServerResponse> {
//     const allOperations = forkJoin(
//         this.getClientData(),
//         this.getOtherData()
//     );

//     const observable = Observable.create(function subscribe(observer) {
//         // Wait until all operations have completed
//         allOperations.subscribe(([clientData, otherData]) => {
//             const data = new ServerResponse;
//             // Update your ServerReponse with client and other data
//             data.otherdata = otherData.other;
//             data.client = clientData.client;
//             // Now that data is 100% populated, emit to anything subscribed to getData().
//             observer.next(data);
//             observer.complete();
//         });

//     });
//     // We return the observable, with the code above to be executed only once it is subscribed to
//     return observable;
// }

//   getJobs(): Observable<ServerResponse> {
//     console.log('Trying to get jobs')
//     const observable = new Observable(
//       function subscribe(observer) {
        
//       }
//     )
    

//         return this.http.get<JobResult>(
//           this.jobServerUrl, 
//           {
//             withCredentials: true,
//             observe: 'body',
//             responseType: 'json'
//           }
//         )    
//       }),
//       catchError(error => {
//         console.log('Getting app data failed')
//         return throwError(error)
//       })
//     ).subscribe((data) => {
//       console.log('got list: ', data)
//       data.forEach(element => this.table_data.push(element));
//       console.log('table data: ', this.table_data)
//     })
//   }

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

  // getJobs() {
  //   console.log('Trying to get jobs')
  //   this.authService.authState.pipe(
  //     tap((state) => console.log('[Jobs list] authState', state)),
  //     filter((state) => state),
  //     switchMap(() => {
  //       console.log('[Jobs list] Getting jobs')
  //       const jobResult = this.http.get<JobResult>(
  //         this.jobServerUrl, 
  //         {
  //           withCredentials: true,
  //           observe: 'body',
  //           responseType: 'json'
  //         }
  //       )
  //       return jobResult
  //     }),
  //     catchError(error => {
  //       console.log('Getting app data failed')
  //       return throwError(error)
  //     })
  //   ).subscribe((data) => {
  //     console.log('got list: ', data)
  //     this.table_data = data
  //     console.log('table data: ', this.table_data)
  //   })
  // }


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