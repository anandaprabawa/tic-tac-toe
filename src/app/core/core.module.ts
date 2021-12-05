import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { IconRegistrationModule } from './icon-registration.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, IconRegistrationModule],
})
export class CoreModule {}
