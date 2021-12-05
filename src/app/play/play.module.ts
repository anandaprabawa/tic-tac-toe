import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../shared/shared.module';
import { PlayVsFriendComponent } from './pages/play-vs-friend/play-vs-friend.component';
import { PlayRoutingModule } from './play-routing.module';

@NgModule({
  declarations: [PlayVsFriendComponent],
  imports: [CommonModule, PlayRoutingModule, SharedModule, MatDialogModule],
})
export class PlayModule {}
