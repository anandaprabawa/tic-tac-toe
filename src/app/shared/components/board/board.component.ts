import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  delay,
  filter,
  map,
  merge,
  of,
  skip,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { WinnerService } from 'src/app/core/services/winner.service';
import { Board } from '../../../core/types/board.type';
import { BoardFinish } from './board-finish.type';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  @Input() size = 3;
  @Input() player1Identity = 'X';
  @Input() player2Identity = 'O';
  playerTurn: 1 | 2 = 1;

  boardSquares$ = new BehaviorSubject<Board>([]);
  destroy$ = new Subject<void>();

  @Output() finish = new EventEmitter<BoardFinish>();

  constructor(private readonly winnerService: WinnerService) {}

  ngOnInit() {
    this.boardSquares$.next(this.createBoard());
    this.winner$
      .pipe(takeUntil(this.destroy$), delay(100))
      .subscribe((winner) => {
        if (winner) {
          alert(`Congratulation ${winner}, you win!`);
        } else {
          alert('Draw. No one winning this game T_T');
        }
        this.finish.emit({
          winner: winner as BoardFinish['winner'],
          isDraw: !winner,
        });
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get sizeIndexes(): number[] {
    const length = this.size * this.size;
    return Array.from(Array(length).keys());
  }

  get currentPlayer() {
    const identity =
      this.playerTurn === 1 ? this.player1Identity : this.player2Identity;

    return {
      turn: this.playerTurn,
      identity,
    };
  }

  private createBoard(): number[][] {
    const board: number[][] = [];
    for (let i = 0; i < this.sizeIndexes.length; i++) {
      const roundedValue = Math.ceil((i + 1) / this.size);

      // Subtract by 1 because the roundedValue starts at 1,
      // while the array starts at 0.
      const row = roundedValue - 1;

      // Create array for row if it undefined.
      if (board[row] === undefined) {
        board[row] = [];
      }

      // Push current item to row.
      board[row].push(this.sizeIndexes[i]);
    }
    return board;
  }

  trackByRow(_: number, row: (number | string)[]) {
    return row;
  }

  trackByRowItem(_: number, item: number | string) {
    return item;
  }

  makeMove(rowIndex: number, itemIndex: number) {
    const board = [...this.boardSquares$.value];

    if (typeof board[rowIndex][itemIndex] !== 'number') {
      // Other players cannot modify the existing marks.
      return;
    }

    board[rowIndex][itemIndex] = this.currentPlayer.identity;

    this.boardSquares$.next(board);
    this.changePlayerTurn();
  }

  private changePlayerTurn() {
    if (this.currentPlayer.turn === 1) {
      this.playerTurn = 2;
    } else {
      this.playerTurn = 1;
    }
  }

  private readonly boardItemFinished$ = this.boardSquares$.pipe(
    map((board) =>
      board.every((row) => row.every((item) => typeof item !== 'number'))
    )
  );

  private readonly winner$ = this.boardSquares$.pipe(
    skip(1),
    switchMap((board) =>
      combineLatest([this.boardItemFinished$, this.checkWinner(board)])
    ),
    filter(([boardItemFinished, winner]) => !!boardItemFinished || !!winner),
    map(([, winner]) => winner)
  );

  private checkWinner(board: Board) {
    return merge(
      of(
        this.winnerService.checkHorizontal({
          board,
          playerIdentities: [this.player1Identity, this.player2Identity],
        })
      )
    );
  }
}
