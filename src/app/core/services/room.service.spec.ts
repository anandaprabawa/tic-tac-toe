import { TestBed } from '@angular/core/testing';
import { Database } from '@angular/fire/database';
import { Firestore } from '@angular/fire/firestore';
import { RoomService } from './room.service';

describe('RoomService', () => {
  let service: RoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Database, useValue: {} },
        { provide: Firestore, useValue: {} },
      ],
    });
    service = TestBed.inject(RoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
