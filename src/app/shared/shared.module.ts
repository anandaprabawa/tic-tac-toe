import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CenteredLayoutModule } from './components/centered-layout/centered-layout.module';
import { PrimaryButtonModule } from './components/primary-button/primary-button.module';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [CenteredLayoutModule, PrimaryButtonModule],
})
export class SharedModule {}
