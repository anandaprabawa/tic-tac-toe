import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayVsFriendComponent } from './play-vs-friend.component';

describe('PlayVsFriendComponent', () => {
  let component: PlayVsFriendComponent;
  let fixture: ComponentFixture<PlayVsFriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayVsFriendComponent],
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
