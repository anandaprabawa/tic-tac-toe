import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { JoinRoomDialogComponent } from './join-room-dialog.component';

@NgModule({
  declarations: [JoinRoomDialogComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  exports: [JoinRoomDialogComponent],
})
export class JoinRoomDialogModule {}
