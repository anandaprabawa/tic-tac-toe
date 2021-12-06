import { TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { Database } from '@angular/fire/database';
import { PlayerService } from './player.service';
import { RoomService } from './room.service';

describe('PlayerService', () => {
  let service: PlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Database, useValue: {} },
        { provide: Auth, useValue: {} },
        { provide: RoomService, useValue: {} },
      ],
    });
    service = TestBed.inject(PlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
