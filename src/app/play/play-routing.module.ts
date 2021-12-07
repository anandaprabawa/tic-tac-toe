import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CenteredLayoutComponent } from '../shared/components/centered-layout/centered-layout.component';
import { PlayOptionsComponent } from './pages/play-options/play-options.component';
import { PlayVsFriendComponent } from './pages/play-vs-friend/play-vs-friend.component';
import { PlayVsPlayerComponent } from './pages/play-vs-player/play-vs-player.component';

const routes: Routes = [
  {
    path: '',
    component: CenteredLayoutComponent,
    children: [
      {
        path: '',
        component: PlayOptionsComponent,
      },
      {
        path: 'vs-friend',
        component: PlayVsFriendComponent,
      },
      {
        path: 'vs-player',
        component: PlayVsPlayerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayRoutingModule {}
