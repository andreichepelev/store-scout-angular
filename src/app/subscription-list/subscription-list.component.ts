import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';


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

  appList: string[] = ['Instagram', 'Facebook', 'Telegram', 'WhatsApp', 'GitHub']

  deleteSelected() {
    var selectedList: string[] = this.selectionList.selectedOptions.selected.map(s => s.value)
    var diff = this.appList.filter(el => !selectedList.includes(el))
    this.appList = diff
  }

  constructor() { }

  ngOnInit(): void {
  }

}