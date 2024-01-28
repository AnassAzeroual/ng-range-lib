import { TestBed } from '@angular/core/testing';

import { NgRangeService } from './ng-range.service';

describe('NgRangeService', () => {
  let service: NgRangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgRangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
