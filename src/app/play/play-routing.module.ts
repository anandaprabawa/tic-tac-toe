import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CenteredLayoutComponent } from '../shared/components/centered-layout/centered-layout.component';
import { PlayVsFriendComponent } from './pages/play-vs-friend/play-vs-friend.component';

const routes: Routes = [
  {
    path: '',
    component: CenteredLayoutComponent,
    children: [
      {
        path: 'vs-friend',
        component: PlayVsFriendComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayRoutingModule {}
