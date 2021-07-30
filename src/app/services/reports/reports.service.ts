import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Observer } from 'rxjs';
import io from 'socket.io-client';
import { Report } from '../../models/report';

const SOCKET_ENDPOINT = 'wss://api.zaibatsu.fyi/';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  private socket;
  observer: Observer<any>;

  constructor(
    public cookieService: CookieService //for putting access token into cookies
  ) {}

  getReport(): Observable<Report> {
    const token = this.cookieService.get('idToken')
    console.debug('Connection to Socket.IO with token', token)
    this.socket = io(SOCKET_ENDPOINT, {
      query: {
        token
      }
    });

    this.socket.on('UpdateComplete', (report: Report) => {
      this.observer.next(report);
    });

    return this.createObservable();
  }
  createObservable(): Observable<Report> {
    return new Observable((observer) => {
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
