import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CenteredLayoutComponent } from './centered-layout.component';

@NgModule({
  declarations: [CenteredLayoutComponent],
  imports: [CommonModule, RouterModule],
  exports: [CenteredLayoutComponent],
})
export class CenteredLayoutModule {}
