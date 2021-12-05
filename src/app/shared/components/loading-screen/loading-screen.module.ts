import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingScreenComponent } from './loading-screen.component';

@NgModule({
  declarations: [LoadingScreenComponent],
  imports: [CommonModule, MatProgressSpinnerModule],
  exports: [LoadingScreenComponent],
})
export class LoadingScreenModule {}
