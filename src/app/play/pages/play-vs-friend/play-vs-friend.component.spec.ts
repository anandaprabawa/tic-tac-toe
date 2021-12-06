import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { PlayerService } from 'src/app/core/services/player.service';
import { RoomService } from 'src/app/core/services/room.service';
import { PlayVsFriendComponent } from './play-vs-friend.component';

describe('PlayVsFriendComponent', () => {
  let component: PlayVsFriendComponent;
  let fixture: ComponentFixture<PlayVsFriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayVsFriendComponent],
      imports: [RouterTestingModule, MatDialogModule],
      providers: [
        {
          provide: RoomService,
          useValue: {
            getBoardResult: () => of({}),
            getPlayerTurn: () => of({}),
          },
        },
        {
          provide: PlayerService,
          useValue: {
            getPlayers: () => of({}),
            getMe: () => of({}),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayVsFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
