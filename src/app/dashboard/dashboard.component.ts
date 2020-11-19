import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core'
import { AuthService } from '../services/auth.service'
import { SignInComponent } from '../sign-in/sign-in.component'
import { MatDialog } from '@angular/material/dialog'
import {MediaMatcher} from '@angular/cdk/layout';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {

  mobileQuery: MediaQueryList
  private _mobileQueryListener: () => void;



  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 760px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  openLogInDialog() {
    this.dialog.open(SignInComponent, {});
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
