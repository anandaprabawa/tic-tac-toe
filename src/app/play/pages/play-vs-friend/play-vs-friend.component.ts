import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-play-vs-friend',
  templateUrl: './play-vs-friend.component.html',
  styleUrls: ['./play-vs-friend.component.scss'],
})
export class PlayVsFriendComponent {
  constructor(private readonly router: Router) {}

  onFinish() {
    this.router.navigate(['..']);
  }
}
