import { TestBed } from '@angular/core/testing';

import { CustomauthService } from './auth.custom.service';

describe('CustomauthService', () => {
  let service: CustomauthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomauthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
