import { TestBed } from '@angular/core/testing';

import { GlobalToasterService } from './global-toaster.service';

describe('GlobalToasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalToasterService = TestBed.get(GlobalToasterService);
    expect(service).toBeTruthy();
  });
});
