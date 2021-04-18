import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { ConfirmRemovalComponent } from '../confirm-removal/confirm-removal.component'
import { MatDialog } from '@angular/material/dialog'

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

  onSelectionChange() {
    if (this.selectionList.selectedOptions.selected.length > 0) {
      this.areSelected = true
    }
    else {
      this.areSelected = false
    }
  }

  appList: AppName[] = [{appNameText: 'Facebook'}, {appNameText: 'Instagram'}]

  deleteSelected() {
    var selectedList: string[] = this.selectionList.selectedOptions.selected.map(s => s.value)
    var stringArray = this.appList.map(item => item.appNameText)
    var diff = stringArray.filter(el => !selectedList.includes(el))
    stringArray = diff
  }

  openConfirmationDialog() {
    this.dialog.open(ConfirmRemovalComponent, {});
  }

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

}