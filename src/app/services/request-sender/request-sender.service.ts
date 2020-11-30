import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const server = "http://www.zaibatsu.fyi/api/ios"

@Injectable({
  providedIn: 'root'
})
export class RequestSenderService {

  constructor(private httpClient: HttpClient) { }
}
