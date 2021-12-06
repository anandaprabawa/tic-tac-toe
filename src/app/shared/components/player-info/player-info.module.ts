import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PlayerInfoComponent } from './player-info.component';

@NgModule({
  declarations: [PlayerInfoComponent],
  imports: [CommonModule, MatButtonModule, ClipboardModule, MatSnackBarModule],
  exports: [PlayerInfoComponent],
})
export class PlayerInfoModule {}
