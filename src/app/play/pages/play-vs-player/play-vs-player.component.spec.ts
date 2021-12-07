import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { RoomService } from 'src/app/core/services/room.service';
import { PlayVsPlayerComponent } from './play-vs-player.component';

describe('PlayVsPlayerComponent', () => {
  let component: PlayVsPlayerComponent;
  let fixture: ComponentFixture<PlayVsPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayVsPlayerComponent],
      imports: [RouterTestingModule, MatDialogModule],
      providers: [
        {
          provide: RoomService,
          useValue: {
            getOfflineRoom: () => ({}),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayVsPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
