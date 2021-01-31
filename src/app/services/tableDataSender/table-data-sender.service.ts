import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class TableDataSenderService {

  subject = new BehaviorSubject<any>(0);
  
  pushTableData(report: object) {
    this.subject.next(report)
  }
}