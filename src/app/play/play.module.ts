import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../shared/shared.module';
import { PlayOptionsComponent } from './pages/play-options/play-options.component';
import { PlayVsFriendComponent } from './pages/play-vs-friend/play-vs-friend.component';
import { PlayRoutingModule } from './play-routing.module';

@NgModule({
  declarations: [PlayVsFriendComponent, PlayOptionsComponent],
  imports: [
    CommonModule,
    PlayRoutingModule,
    SharedModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class PlayModule {}
