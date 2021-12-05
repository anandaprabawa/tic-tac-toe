import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BoardComponent } from './board.component';
import { HideBoardKeyPipe } from './hide-board-key.pipe';

@NgModule({
  declarations: [BoardComponent, HideBoardKeyPipe],
  imports: [CommonModule, MatIconModule],
  exports: [BoardComponent],
})
export class BoardModule {}
