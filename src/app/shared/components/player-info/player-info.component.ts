import { Clipboard } from '@angular/cdk/clipboard';
import { Component, HostBinding, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss'],
})
export class PlayerInfoComponent {
  @Input() player!: number;
  @Input() name?: string;
  @Input() isMyTurn?: boolean;
  @Input() invitationLink?: string;

  @HostBinding('class.right')
  get isRight() {
    return this.player === 2;
  }

  constructor(
    private readonly clipboard: Clipboard,
    private readonly snackBar: MatSnackBar
  ) {}

  copyInvitationLink() {
    if (this.invitationLink) {
      this.clipboard.copy(this.invitationLink);
      this.snackBar.open('Invitation link copied', 'Dismiss', {
        duration: 2000,
      });
    }
  }
}
