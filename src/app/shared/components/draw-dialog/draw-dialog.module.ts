import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DrawDialogComponent } from './draw-dialog.component';

@NgModule({
  declarations: [DrawDialogComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  exports: [DrawDialogComponent],
})
export class DrawDialogModule {}
