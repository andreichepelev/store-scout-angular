import { TestBed } from '@angular/core/testing';

import { RequestSenderService } from './request-sender.service';

describe('RequestSenderService', () => {
  let service: RequestSenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestSenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
