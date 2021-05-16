import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { ConfirmRemovalComponent } from '../confirm-removal/confirm-removal.component'
import { MatDialog } from '@angular/material/dialog'

//for the API request
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';


export interface AppName {
  appNameText: string;
}

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.scss']
})
export class SubscriptionListComponent implements OnInit {


  @ViewChild('apps') selectionList: MatSelectionList

  areSelected = false

  subscribeServerUrl = 'http://api.zaibatsu.fyi/api/getapps';

  onSelectionChange() {
    if (this.selectionList.selectedOptions.selected.length > 0) {
      this.areSelected = true
    }
    else {
      this.areSelected = false
    }
  }

  appList: AppName[] = [{appNameText: 'Facebook'}, {appNameText: 'Instagram'}]
  stringArray = this.appList.map(item => item.appNameText)


  deleteSelected() {
    var selectedList: string[] = this.selectionList.selectedOptions.selected.map(s => s.value)
    var diff = this.stringArray.filter(el => !selectedList.includes(el))
    this.stringArray = diff
  }

  openConfirmationDialog() {
    this.dialog.open(ConfirmRemovalComponent, {});
  }


  private extractData(res: Response): any {
    const body = res;
    console.log('response is: ', body)
    return body || { };
  }


  getApps() {
    console.log('Getting apps per user')
    this.http.get(
      this.subscribeServerUrl, 
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .pipe(
        map(this.extractData),
        catchError(error => {
          console.log('Getting app data failed')
          return throwError(error)
        })
      )
      console.log('subscription request sent')
  }



  constructor(
    public dialog: MatDialog,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getApps()
  }

}