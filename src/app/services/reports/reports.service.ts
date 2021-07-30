import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import io from 'socket.io-client';
import { Report } from '../../models/report';
import { AuthService } from '../auth/auth.service';

const SOCKET_ENDPOINT = 'wss://api.zaibatsu.fyi/';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  socket: Observable<any>;

  constructor(
    public authService: AuthService //for putting access token into cookies
  ) {
    this.socket = this.authService.authState.pipe(
      tap((state) => console.log('[ReportService] authSate', state)),
      filter((state) => state),
      map(() => {
        console.log('[ReportService] Creating new socket')
        return io(SOCKET_ENDPOINT);
      }),
      shareReplay(1)
    );
  }

  getReport(): Observable<Report> {
    console.log('[ReportService] getReport');

    console.debug('ReportService#getReport');
    return this.socket.pipe(
      switchMap((socket) => {
        console.log('[ReportService] Subscribing to events')
        return new Observable<Report>((subscriber) => {
          socket.on('UpdateComplete', (report: Report) => {
            subscriber.next(report);
          });
        });
      })
    );
  }
}
