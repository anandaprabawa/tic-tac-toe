import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { WinnerDialogComponent } from './winner-dialog.component';

@NgModule({
  declarations: [WinnerDialogComponent],
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule],
  exports: [WinnerDialogComponent],
})
export class WinnerDialogModule {}
