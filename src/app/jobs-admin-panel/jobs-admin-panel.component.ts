import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core'
import { AuthService } from '../services/auth/auth.service'
import { MatDialog } from '@angular/material/dialog'
import { MediaMatcher } from '@angular/cdk/layout';

//
import { Job } from '../models/job'


//for sending requests
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Component({
  selector: 'app-jobs-admin-panel',
  templateUrl: './jobs-admin-panel.component.html',
  styleUrls: ['./jobs-admin-panel.component.scss']
})
export class JobsAdminPanelComponent implements OnInit, OnDestroy {

  //table data:
  jobData: Job[] = [];
  //hardcoded data for testing:
  //{os: '123', storedAppID: 'asd', appNameText: '132', versionText: 'kh', releaseDateText: 'rew', releaseNotesText: 'rrr'}
  report: Job;

  //table column names
  col_names: string[] = ['os','appNameText', 'releaseDateText', 'versionText', 'releaseNotesText'];
  //table data exported:
  table_data = this.jobData;



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

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener)

  }

}