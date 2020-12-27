import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ProgressbarService {

  // chipsAmount = new BehaviorSubject<number>(0); 

  clickSubject = new BehaviorSubject<any>(0);
  
  sendClickEvent(chipsAmount: number) {
    this.clickSubject.next(chipsAmount);
  }
  // getClickEvent(): Observable<any>{ 
  //   return this.clickSubject.asObservable();
  // }
}