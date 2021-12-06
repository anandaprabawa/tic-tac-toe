import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  delay,
  filter,
  map,
  skip,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { Player } from 'src/app/core/models/player.model';
import { Room } from 'src/app/core/models/room.model';
import { WinnerService } from 'src/app/core/services/winner.service';
import { Board, BoardResult } from '../../../core/types/board.type';
import { BoardFinish } from './board-finish.type';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy, OnChanges {
  @Input() size = 3;
  @Input() player1Name = 'X';
  @Input() player2Name = 'O';
  @Input() result: BoardResult = [];
  @Input() playerTurn: Room['playerTurn'] = 1;
  @Input() me?: Player;
  @Input() waiting = true;

  board: Board = [];
  boardResult$ = new BehaviorSubject<BoardResult>([]);
  destroy$ = new Subject<void>();

  @Output() finish = new EventEmitter<BoardFinish>();
  @Output() boardResult = new EventEmitter<BoardResult>();
  @Output() playerTurnChange = new EventEmitter();

  constructor(private readonly winnerService: WinnerService) {}

  ngOnInit() {
    this.board = this.createBoard();
    this.winner$
      .pipe(takeUntil(this.destroy$), delay(100))
      .subscribe((winner) => {
        this.finish.emit({
          winner: winner as BoardFinish['winner'],
          isDraw: !winner,
        });
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['result']) {
      const board = changes['result'].currentValue;
      this.boardResult$.next(board?.length ? board : this.createBoard());
    }
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
      this.playerTurn === 1 ? this.player1Name : this.player2Name;

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
    const boardResult = [...this.boardResult$.value];

    if (typeof boardResult[rowIndex][itemIndex] !== 'number') {
      // Other players cannot modify the existing marks.
      return;
    }

    if (this.me?.player !== this.playerTurn) {
      // Prevent marking the square if current player is already make a marks.
      return;
    }

    boardResult[rowIndex][itemIndex] = this.currentPlayer.identity;

    this.boardResult.emit(boardResult);
    this.changePlayerTurn();
  }

  private changePlayerTurn() {
    const turn = this.currentPlayer.turn === 1 ? 2 : 1;
    this.playerTurnChange.emit(turn);
  }

  private readonly boardItemFinished$ = this.boardResult$.pipe(
    map((boardResult) =>
      boardResult.every((row) => row.every((item) => typeof item !== 'number'))
    )
  );

  private readonly winner$ = this.boardResult$.pipe(
    skip(1),
    switchMap((boardResult) =>
      combineLatest([
        this.boardItemFinished$,
        this.winnerService.checkWinner({
          board: this.board,
          boardResult: boardResult,
          playerIdentities: [this.player1Name, this.player2Name],
        }),
      ])
    ),
    filter(([boardItemFinished, winner]) => !!boardItemFinished || !!winner),
    map(([, winner]) => winner)
  );
}
