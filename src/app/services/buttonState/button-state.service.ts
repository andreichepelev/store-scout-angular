import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ButtonStateService {

  subject = new BehaviorSubject<any>(0);
  
  updateAppsNumber(appsNumber: number) {
    this.subject.next(appsNumber);
  }
}