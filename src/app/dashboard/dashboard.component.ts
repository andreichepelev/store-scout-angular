import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core'
import { AuthService } from '../services/auth/auth.service'
import { SignInComponent } from '../sign-in/sign-in.component'
import { MatDialog } from '@angular/material/dialog'
import { MediaMatcher } from '@angular/cdk/layout';

//for button state update and subscriptions
import { Subscription } from 'rxjs'
import { ButtonStateService } from '../services/buttonState/button-state.service'
import { TableDataSenderService } from '../services/tableDataSender/table-data-sender.service'



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  //for button state changing
  doesTableContainApps = false
  buttonStateSubscription: Subscription
  tableDataSubscription: Subscription
 
  changeButtonState(appsNumber) {
    if (appsNumber > 0) {
      this.doesTableContainApps = true
    }
  }

  tableData = []

  //*ngIf="doesTableContainApps"

  // showProgressBar(x) {
  //   this.isLoading = true
  //   setTimeout(()=> {
  //   this.isLoading = false;
  //   }, x*10000)
  // }

  //for responsiveness
  mobileQuery: MediaQueryList
  private _mobileQueryListener: () => void;

  constructor(
    public authService: AuthService,
    private buttonStateService: ButtonStateService,
    private tableDataSenderService: TableDataSenderService,
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

  subscribe() {
    console.log(this.tableData)
  }

  ngOnInit() {

    this.buttonStateSubscription = this.buttonStateService.subject.subscribe((appsNumber)=>{
      this.changeButtonState(appsNumber)
    })

    this.tableDataSubscription = this.tableDataSenderService.subject.subscribe((report)=>{
      this.tableData.push(report)
    })

    this.authService.putTokenIntoCookie()
    this.authService.getTokenCookie()

    // this.clickEventsubscription = this.progressbarService.clickSubject.subscribe((x)=>{
    //   this.showProgressBar(x);
    // })
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener)
    this.buttonStateSubscription.unsubscribe()
    this.tableDataSubscription.unsubscribe()
  }

}
