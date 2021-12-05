import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BoardModule } from './components/board/board.module';
import { CenteredLayoutModule } from './components/centered-layout/centered-layout.module';
import { PrimaryButtonModule } from './components/primary-button/primary-button.module';
import { WinnerDialogModule } from './components/winner-dialog/winner-dialog.module';

@NgModule({
  imports: [CommonModule],
  exports: [
    CenteredLayoutModule,
    PrimaryButtonModule,
    BoardModule,
    WinnerDialogModule,
  ],
})
export class SharedModule {}
