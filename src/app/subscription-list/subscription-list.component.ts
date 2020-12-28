import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.scss']
})
export class SubscriptionListComponent implements OnInit {

  appList: string[] = ['Instagram', 'Facebook', 'Telegram', 'WhatsApp', 'GitHub'];

  // deleteSelected() {
  //   console.log(selectionList.selectedOptions.selected.length)
  // }
  

  // deleteSelected() {
  //   console.log(this.appList.selectedOptions.selected.map(s => s.value))
  // }

  constructor() { }

  ngOnInit(): void {
  }

}
