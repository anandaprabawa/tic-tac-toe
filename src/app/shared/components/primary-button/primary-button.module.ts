import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PrimaryButtonComponent } from './primary-button.component';

@NgModule({
  declarations: [PrimaryButtonComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [PrimaryButtonComponent],
})
export class PrimaryButtonModule {}
