import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BoardModule } from './components/board/board.module';
import { CenteredLayoutModule } from './components/centered-layout/centered-layout.module';
import { ErrorDialogModule } from './components/error-dialog/error-dialog.module';
import { LoadingScreenModule } from './components/loading-screen/loading-screen.module';
import { NameDialogModule } from './components/name-dialog/name-dialog.module';
import { NavMenuModule } from './components/nav-menu/nav-menu.module';
import { PrimaryButtonModule } from './components/primary-button/primary-button.module';
import { WinnerDialogModule } from './components/winner-dialog/winner-dialog.module';

@NgModule({
  imports: [CommonModule],
  exports: [
    CenteredLayoutModule,
    PrimaryButtonModule,
    BoardModule,
    WinnerDialogModule,
    NavMenuModule,
    NameDialogModule,
    LoadingScreenModule,
    ErrorDialogModule,
  ],
})
export class SharedModule {}
