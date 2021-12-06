import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  combineLatest,
  delay,
  filter,
  map,
  of,
  share,
  Subject,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { Player } from 'src/app/core/models/player.model';
import { Room } from 'src/app/core/models/room.model';
import { PlayerService } from 'src/app/core/services/player.service';
import { RoomService } from 'src/app/core/services/room.service';
import { UiService } from 'src/app/core/services/ui.service';
import { BoardResult } from 'src/app/core/types/board.type';
import { BoardFinish } from 'src/app/shared/components/board/board-finish.type';
import { DrawDialogComponent } from 'src/app/shared/components/draw-dialog/draw-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ErrorDialogData } from 'src/app/shared/components/error-dialog/error-dialog.type';
import { JoinRoomDialogComponent } from 'src/app/shared/components/join-room-dialog/join-room-dialog.component';
import { JoinRoomDialogData } from 'src/app/shared/components/join-room-dialog/join-room.type';
import { NameDialogComponent } from 'src/app/shared/components/name-dialog/name-dialog.component';
import { WinnerDialogComponent } from 'src/app/shared/components/winner-dialog/winner-dialog.component';
import { WinnerDialogData } from 'src/app/shared/components/winner-dialog/winner-dialog.type';

@Component({
  selector: 'app-play-vs-friend',
  templateUrl: './play-vs-friend.component.html',
  styleUrls: ['./play-vs-friend.component.scss'],
})
export class PlayVsFriendComponent implements OnInit, OnDestroy {
  room?: Room;

  boardResult: BoardResult = [];
  playerTurn: Room['playerTurn'] = 1;
  me?: Player;
  readonly destroy$ = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly dialog: MatDialog,
    private readonly roomService: RoomService,
    public readonly uiService: UiService,
    private readonly playerService: PlayerService
  ) {}

  get roomIdParam(): string | undefined {
    return this.route.snapshot.queryParams['roomId'];
  }

  get player1() {
    return this.room?.players[0];
  }

  get player2() {
    return this.room?.players[1];
  }

  get invitationLink() {
    return window.location.href;
  }

  readonly room$ = of(this.roomIdParam).pipe(
    switchMap((roomId) =>
      roomId ? this.roomService.getRoom(roomId) : of(null)
    ),
    tap((room) => {
      if (!room) {
        this.uiService.loadingScreen$.next(false);
        this.handleInvalidRoom();
      }
    }),
    filter((room) => !!room),
    map((room) => room as Room),
    tap((room) => {
      this.room = room;
    }),
    share()
  );

  readonly currentPlayerInRoom$ = this.room$.pipe(
    map((room) =>
      room ? this.playerService.validateCurrentPlayerInRoom(room) : null
    )
  );

  readonly boardResult$ = this.roomService.getBoardResult(this.roomIdParam);

  readonly players$ = this.playerService.getPlayers(this.roomIdParam);

  ngOnInit() {
    of(true)
      .pipe(
        delay(0),
        tap(() => this.uiService.loadingScreen$.next(true)),
        switchMap(() => combineLatest([this.room$, this.currentPlayerInRoom$])),
        take(1),
        tap(() => this.uiService.loadingScreen$.next(false)),
        tap(([room, currentPlayer]) => {
          if (room.players.length !== 2 && !currentPlayer) {
            // Ask another player to join the room
            this.showJoinRoomDialog(room.players[0].name);
          } else if (room.players.length >= 2 && !currentPlayer) {
            this.redirectToMainMenu();
          }
        })
      )
      .subscribe();

    this.boardResult$.pipe(takeUntil(this.destroy$)).subscribe((result) => {
      this.boardResult = result || [];
    });

    this.roomService
      .getPlayerTurn(this.roomIdParam)
      .pipe(takeUntil(this.destroy$))
      .subscribe((playerTurn) => {
        this.playerTurn = playerTurn || 1;
      });

    this.playerService
      .getMe(this.roomIdParam)
      .pipe(takeUntil(this.destroy$))
      .subscribe((player) => {
        this.me = player;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onBoardResult(result: BoardResult) {
    if (!this.roomIdParam) return;
    this.roomService.saveBoardResult(this.roomIdParam, result);
  }

  onPlayerTurnChange(turn: number) {
    if (!this.roomIdParam) return;
    this.roomService.changePlayerTurn(this.roomIdParam, turn);
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

    dialogRef
      .beforeClosed()
      .pipe(switchMap(() => this.roomService.deleteRoom(this.roomIdParam)))
      .subscribe(() => {
        this.router.navigateByUrl('/', { replaceUrl: true });
      });
  }

  private showDrawDialog() {
    const dialogRef = this.dialog.open(DrawDialogComponent, {
      autoFocus: false,
    });

    dialogRef
      .beforeClosed()
      .pipe(switchMap(() => this.roomService.deleteRoom(this.roomIdParam)))
      .subscribe(() => {
        this.router.navigateByUrl('/', { replaceUrl: true });
      });
  }

  private showErrorDialog(message: string) {
    const dialogRef = this.dialog.open<ErrorDialogComponent, ErrorDialogData>(
      ErrorDialogComponent,
      {
        autoFocus: false,
        disableClose: true,
        data: { message: message },
      }
    );

    dialogRef.beforeClosed().subscribe(() => {
      this.redirectToMainMenu();
    });

    return dialogRef;
  }

  private redirectToMainMenu() {
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  private showJoinRoomDialog(anotherPlayerName: string) {
    const dialogRef = this.dialog.open<
      JoinRoomDialogComponent,
      JoinRoomDialogData
    >(JoinRoomDialogComponent, {
      autoFocus: false,
      data: { anotherPlayerName },
    });

    dialogRef.beforeClosed().subscribe((wantToJoin) => {
      if (wantToJoin) {
        this.showNameDialogOnJoin();
      } else {
        this.redirectToMainMenu();
      }
    });
  }

  private showNameDialogOnJoin() {
    const dialogRef = this.dialog.open<NameDialogComponent, unknown, string>(
      NameDialogComponent,
      { autoFocus: false }
    );

    dialogRef.afterClosed().subscribe((player2Name) => {
      if (player2Name && this.roomIdParam) {
        this.playerService.saveName(player2Name, this.roomIdParam, 2);
      } else {
        this.redirectToMainMenu();
      }
    });
  }

  private handleInvalidRoom(): void {
    const dialogRef = this.showErrorDialog(
      'Room not found. You will be redirected to main menu.'
    );
    setTimeout(() => dialogRef.close(), 3000);
    setTimeout(() => this.redirectToMainMenu(), 3100);
  }
}
