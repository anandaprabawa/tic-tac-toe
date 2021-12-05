import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavMenuComponent } from './nav-menu.component';

@NgModule({
  declarations: [NavMenuComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavMenuComponent],
})
export class NavMenuModule {}
