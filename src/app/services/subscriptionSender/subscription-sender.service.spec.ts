import { TestBed } from '@angular/core/testing';

import { SubscriptionSenderService } from './subscription-sender.service';

describe('SubscriptionSenderService', () => {
  let service: SubscriptionSenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriptionSenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
