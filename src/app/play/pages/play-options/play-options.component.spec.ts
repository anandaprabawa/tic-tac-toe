import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { PlayerService } from 'src/app/core/services/player.service';
import { RoomService } from 'src/app/core/services/room.service';
import { PlayOptionsComponent } from './play-options.component';

describe('PlayOptionsComponent', () => {
  let component: PlayOptionsComponent;
  let fixture: ComponentFixture<PlayOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayOptionsComponent],
      imports: [RouterTestingModule, ReactiveFormsModule, MatDialogModule],
      providers: [
        { provide: RoomService, useValue: {} },
        { provide: PlayerService, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
