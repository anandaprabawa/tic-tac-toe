import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MenuListComponent } from './menu-list.component';

@NgModule({
  declarations: [MenuListComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [MenuListComponent],
})
export class MenuListModule {}
