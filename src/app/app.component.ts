import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth, signInAnonymously } from '@angular/fire/auth';
import { from, Subject, takeUntil } from 'rxjs';
import { UiService } from './core/services/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  readonly destroy$ = new Subject<void>();

  constructor(
    private readonly auth: Auth,
    public readonly uiService: UiService
  ) {}

  ngOnInit() {
    from(signInAnonymously(this.auth))
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.uiService.loadingScreen$.next(false);
    this.uiService.loadingScreen$.complete();
  }
}
