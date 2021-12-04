import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CenteredLayoutComponent } from '../shared/components/centered-layout/centered-layout.component';
import { MainMenuComponent } from './pages/main-menu/main-menu.component';

const routes: Routes = [
  {
    path: '',
    component: CenteredLayoutComponent,
    children: [
      {
        path: '',
        component: MainMenuComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainMenuRoutingModule {}
