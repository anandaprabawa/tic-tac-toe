import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map, of, switchMap, tap } from 'rxjs';
import { PlayerService } from 'src/app/core/services/player.service';
import { RoomService } from 'src/app/core/services/room.service';
import { UiService } from 'src/app/core/services/ui.service';
import { NameDialogComponent } from 'src/app/shared/components/name-dialog/name-dialog.component';

@Component({
  selector: 'app-play-options',
  templateUrl: './play-options.component.html',
  styleUrls: ['./play-options.component.scss'],
})
export class PlayOptionsComponent implements OnInit {
  readonly supportedPlayTypes = ['vsFriend'];

  readonly form = this.formBuilder.group({
    boardSize: [
      3,
      [Validators.required, Validators.min(3), Validators.max(10)],
    ],
  });

  get boardSizeControl(): FormControl {
    return this.form.get('boardSize') as FormControl;
  }

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly dialog: MatDialog,
    private readonly playerService: PlayerService,
    private readonly uiService: UiService,
    private readonly roomService: RoomService
  ) {}

  ngOnInit(): void {
    this.validatePlayType();
  }

  get typeQueryParam(): string {
    return this.route.snapshot.queryParams['type'];
  }

  private validatePlayType() {
    const valid = this.supportedPlayTypes.includes(this.typeQueryParam);
    if (!valid) {
      this.router.navigateByUrl('/', { replaceUrl: true });
    }
  }

  getBoardSizeErrorMessage(): string {
    if (this.boardSizeControl.hasError('required')) {
      return 'Board size is required';
    } else if (this.boardSizeControl.hasError('min')) {
      return 'Board size must be at least 3';
    } else if (this.boardSizeControl.hasError('max')) {
      return 'Board size must be at most 10';
    } else {
      return '';
    }
  }

  startGame(event: Event) {
    event.preventDefault();

    // Check if options valid
    if (this.form.invalid) return;

    const dialogRef = this.dialog.open<NameDialogComponent, unknown, string>(
      NameDialogComponent,
      { autoFocus: false }
    );
    dialogRef
      .afterClosed()
      .pipe(
        tap(() => {
          this.uiService.loadingScreen$.next(true);
        }),
        map((name) => {
          if (!name) throw new Error('Name is required');
          return name;
        }),
        switchMap((name) => this.createRoom(name)),
        tap(() => {
          this.uiService.loadingScreen$.next(false);
        })
      )
      .subscribe(([roomId]) => {
        this.navigateToGame(roomId);
      });
  }

  private createRoom(name: string) {
    return this.roomService
      .createRoom({ boardSize: this.boardSizeControl.value })
      .pipe(
        switchMap((roomId) =>
          combineLatest([
            of(roomId),
            this.playerService.saveName(name, roomId, 1),
          ])
        )
      );
  }

  private navigateToGame(roomId: string) {
    this.router.navigate(['./vs-friend'], {
      relativeTo: this.route,
      replaceUrl: true,
      queryParams: {
        roomId: roomId,
      },
    });
  }
}
