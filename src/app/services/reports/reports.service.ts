import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import io from 'socket.io-client';
import { Report } from '../../models/report'

const SOCKET_ENDPOINT = 'wss://api.zaibatsu.fyi/'

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private socket
  observer: Observer<any>

  constructor() {}

   getReport() : Observable<Report> {
    this.socket = io(SOCKET_ENDPOINT, {withCredentials: true})

    this.socket.on('UpdateComplete', (report: Report) => {
      this.observer.next(report);
    });

    return this.createObservable();
  }
    createObservable() : Observable<Report> {
      return new Observable(observer => {
        this.observer = observer;
      });
  }

  private handleError(error) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
        let errMessage = error.error.message;
        return Observable.throw(errMessage);
    }
    return Observable.throw(error || 'Socket.io server error');
  }

}