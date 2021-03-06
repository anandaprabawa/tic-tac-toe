import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { MainMenuRoutingModule } from './main-menu-routing.module';
import { MainMenuComponent } from './pages/main-menu/main-menu.component';

@NgModule({
  declarations: [MainMenuComponent],
  imports: [CommonModule, MainMenuRoutingModule, SharedModule, MatIconModule],
})
export class MainMenuModule {}
