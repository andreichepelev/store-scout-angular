import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Request } from './request'

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RequestSenderService {

  serverUrl = 'http://zaibatsu.fyi/api/ios';

  constructor(
    private http: HttpClient) {
  }

  sendIOSrequest(request: Request): Observable<Request> {
    return this.http.post<Request>(this.serverUrl, request)
      .pipe(
        catchError(error => {
          console.log('Sending data failed')
          return throwError(error)
        })
      );
  }
}

