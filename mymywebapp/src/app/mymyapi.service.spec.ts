import { TestBed } from '@angular/core/testing';

import { MymyapiService } from './mymyapi.service';

describe('MymyapiService', () => {
  let service: MymyapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MymyapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
