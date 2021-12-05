import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardComponent } from './board.component';
import { HideBoardKeyPipe } from './hide-board-key.pipe';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardComponent, HideBoardKeyPipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should structured board array for size 3x3', () => {
    component.size = 3;
    component.ngOnInit();
    const expectedBoard = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ];
    expect(component.boardResult$.value).toEqual(expectedBoard);
  });

  it('should structured board array for size 5x5', () => {
    component.size = 5;
    component.ngOnInit();
    const expectedBoard = [
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24],
    ];
    expect(component.boardResult$.value).toEqual(expectedBoard);
  });
});
