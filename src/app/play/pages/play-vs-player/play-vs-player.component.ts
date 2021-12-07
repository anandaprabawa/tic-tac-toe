import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { of, share, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { OfflineRoom } from 'src/app/core/models/offline-room.model';
import { Player } from 'src/app/core/models/player.model';
import { RoomService } from 'src/app/core/services/room.service';
import { BoardResult } from 'src/app/core/types/board.type';
import { BoardFinish } from 'src/app/shared/components/board/board-finish.type';
import { DrawDialogComponent } from 'src/app/shared/components/draw-dialog/draw-dialog.component';
import { WinnerDialogComponent } from 'src/app/shared/components/winner-dialog/winner-dialog.component';
import { WinnerDialogData } from 'src/app/shared/components/winner-dialog/winner-dialog.type';

@Component({
  selector: 'app-play-vs-player',
  templateUrl: './play-vs-player.component.html',
  styleUrls: ['./play-vs-player.component.scss'],
})
export class PlayVsPlayerComponent implements OnInit, OnDestroy {
  room!: OfflineRoom;
  boardResult: BoardResult = [];
  playerTurn = 1;

  readonly player1: Player = {
    name: 'Player 1',
    player: 1,
    uid: '1',
  };
  readonly player2: Player = {
    name: 'Player 2',
    player: 2,
    uid: '2',
  };

  readonly destroy$ = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly roomService: RoomService
  ) {}

  readonly room$ = of(this.roomService.getOfflineRoom()).pipe(
    tap((room) => (this.room = room)),
    share()
  );

  ngOnInit() {
    of(true)
      .pipe(
        switchMap(() => this.room$),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get currentPlayerTurn() {
    return this.playerTurn === 1 ? this.player1 : this.player2;
  }

  onPlayerTurnChange(playerTurn: number) {
    this.playerTurn = playerTurn;
  }

  onBoardResultChange(result: BoardResult) {
    this.boardResult = result;
  }

  onFinish(params: BoardFinish) {
    if (params.winner) {
      this.showWinnerDialog(params.winner);
    } else {
      this.showDrawDialog();
    }
  }

  private showWinnerDialog(winner: string) {
    const dialogRef = this.dialog.open<WinnerDialogComponent, WinnerDialogData>(
      WinnerDialogComponent,
      { data: { winner }, autoFocus: false, disableClose: true }
    );

    dialogRef.beforeClosed().subscribe(() => {
      this.router.navigateByUrl('/', { replaceUrl: true });
    });
  }

  private showDrawDialog() {
    const dialogRef = this.dialog.open(DrawDialogComponent, {
      autoFocus: false,
    });

    dialogRef.beforeClosed().subscribe(() => {
      this.router.navigateByUrl('/', { replaceUrl: true });
    });
  }
}
