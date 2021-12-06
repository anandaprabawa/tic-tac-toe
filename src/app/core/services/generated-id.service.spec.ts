import { TestBed } from '@angular/core/testing';
import { Firestore } from '@angular/fire/firestore';
import { GeneratedIdService } from './generated-id.service';

describe('GeneratedIdService', () => {
  let service: GeneratedIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Firestore, useValue: {} }],
    });
    service = TestBed.inject(GeneratedIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
