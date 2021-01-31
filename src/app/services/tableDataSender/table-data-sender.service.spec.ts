import { TestBed } from '@angular/core/testing';

import { TableDataSenderService } from './table-data-sender.service';

describe('TableDataSenderService', () => {
  let service: TableDataSenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableDataSenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
