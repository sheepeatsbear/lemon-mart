import { TestBed } from '@angular/core/testing';
import {
  commonTestingModules,
  commonTestingProviders,
} from 'src/app/common/common.testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [commonTestingModules],
      providers: [UserService, commonTestingProviders],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
