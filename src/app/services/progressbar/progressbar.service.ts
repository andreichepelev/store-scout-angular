import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ProgressbarService {

  clickSubject = new BehaviorSubject<any>(0);
  
  sendClickEvent(chipsAmount: number) {
    this.clickSubject.next(chipsAmount);
  }
}