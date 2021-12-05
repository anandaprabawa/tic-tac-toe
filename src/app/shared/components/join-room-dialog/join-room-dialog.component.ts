import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JoinRoomDialogData } from './join-room.type';

@Component({
  selector: 'app-join-room-dialog',
  templateUrl: './join-room-dialog.component.html',
  styleUrls: ['./join-room-dialog.component.scss'],
})
export class JoinRoomDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: JoinRoomDialogData) {}
}
