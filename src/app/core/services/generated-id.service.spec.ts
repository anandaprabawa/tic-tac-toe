import { TestBed } from '@angular/core/testing';

import { GeneratedIdService } from './generated-id.service';

describe('GeneratedIdService', () => {
  let service: GeneratedIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneratedIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
