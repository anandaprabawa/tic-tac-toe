import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, filter, of, switchMap, take, tap } from 'rxjs';
import { RoomService } from 'src/app/core/services/room.service';
import { RulesService } from 'src/app/core/services/rules.service';
import { UiService } from 'src/app/core/services/ui.service';
import { BoardFinish } from 'src/app/shared/components/board/board-finish.type';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ErrorDialogData } from 'src/app/shared/components/error-dialog/error-dialog.type';
import { WinnerDialogComponent } from 'src/app/shared/components/winner-dialog/winner-dialog.component';
import { WinnerDialogData } from 'src/app/shared/components/winner-dialog/winner-dialog.type';

@Component({
  selector: 'app-play-vs-friend',
  templateUrl: './play-vs-friend.component.html',
  styleUrls: ['./play-vs-friend.component.scss'],
})
export class PlayVsFriendComponent implements OnInit {
  errorDialogRef?: MatDialogRef<ErrorDialogComponent>;
  boardSize: number = this.rulesService.minBoardSize;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly dialog: MatDialog,
    private readonly roomService: RoomService,
    public readonly uiService: UiService,
    private readonly rulesService: RulesService
  ) {}

  get roomIdParam() {
    return this.route.snapshot.queryParams['roomId'];
  }

  ngOnInit() {
    of(true)
      .pipe(
        delay(0),
        tap(() => this.uiService.loadingScreen$.next(true)),
        switchMap(() => this.roomService.getRoom(this.roomIdParam)),
        take(1),
        tap((room) => {
          this.boardSize = room.boardSize;
        }),
        tap(() => this.uiService.loadingScreen$.next(false)),
        tap((room) => {
          if (!room) {
            this.showErrorDialog(
              'Room not found. You will be redirected to main menu.'
            );
          }
        }),
        filter((room) => !room),
        delay(3000),
        tap(() => this.errorDialogRef?.close()),
        delay(100),
        tap(() => this.redirectToMainMenu())
      )
      .subscribe();
  }

  onFinish(params: BoardFinish) {
    if (params.winner) {
      this.showWinnerDialog(params.winner);
    }
  }

  private showWinnerDialog(winner: string) {
    const dialogRef = this.dialog.open<WinnerDialogComponent, WinnerDialogData>(
      WinnerDialogComponent,
      { data: { winner }, autoFocus: false, disableClose: true }
    );

    dialogRef.beforeClosed().subscribe(() => {
      this.router.navigate(['..'], { replaceUrl: true });
    });
  }

  private showErrorDialog(message: string) {
    this.errorDialogRef = this.dialog.open<
      ErrorDialogComponent,
      ErrorDialogData
    >(ErrorDialogComponent, {
      autoFocus: false,
      disableClose: true,
      data: { message: message },
    });

    this.errorDialogRef.beforeClosed().subscribe(() => {
      this.redirectToMainMenu();
    });
  }

  private redirectToMainMenu() {
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}
