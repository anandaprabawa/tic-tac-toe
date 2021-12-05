import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-play-options',
  templateUrl: './play-options.component.html',
  styleUrls: ['./play-options.component.scss'],
})
export class PlayOptionsComponent implements OnInit {
  readonly supportedPlayTypes = ['vsFriend'];

  readonly form = this.formBuilder.group({
    boardSize: [
      3,
      [Validators.required, Validators.min(3), Validators.max(10)],
    ],
  });

  get boardSizeControl(): FormControl {
    return this.form.get('boardSize') as FormControl;
  }

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.validatePlayType();
  }

  get typeQueryParam(): string {
    return this.route.snapshot.queryParams['type'];
  }

  private validatePlayType() {
    const valid = this.supportedPlayTypes.includes(this.typeQueryParam);
    if (!valid) {
      this.router.navigateByUrl('/', { replaceUrl: true });
    }
  }

  getBoardSizeErrorMessage(): string {
    if (this.boardSizeControl.hasError('required')) {
      return 'Board size is required';
    } else if (this.boardSizeControl.hasError('min')) {
      return 'Board size must be at least 3';
    } else if (this.boardSizeControl.hasError('max')) {
      return 'Board size must be at most 10';
    } else {
      return '';
    }
  }

  startGame() {
    this.router.navigate(['./vs-friend'], {
      relativeTo: this.route,
      replaceUrl: true,
    });
  }
}
