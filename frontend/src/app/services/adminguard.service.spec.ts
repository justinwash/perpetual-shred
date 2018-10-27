import { TestBed, inject } from '@angular/core/testing';

import { AdminGuardService } from './adminguard.service';

describe('AdminguardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminGuardService]
    });
  });

  it('should be created', inject([AdminGuardService], (service: AdminGuardService) => {
    expect(service).toBeTruthy();
  }));
});
