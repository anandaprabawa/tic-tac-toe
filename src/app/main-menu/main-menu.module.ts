import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MenuListModule } from './components/menu-list/menu-list.module';
import { MainMenuRoutingModule } from './main-menu-routing.module';
import { MainMenuComponent } from './pages/main-menu/main-menu.component';

@NgModule({
  declarations: [MainMenuComponent],
  imports: [CommonModule, MainMenuRoutingModule, SharedModule, MenuListModule],
})
export class MainMenuModule {}
