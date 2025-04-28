import { Component, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterModule,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingService } from './services/loading.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  imports: [MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatSidenavModule, MatToolbarModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {
  public isLoading: boolean = true;
  public title: string = 'Adjutum';

  private subscription: Subscription = new Subscription();

  constructor(
    private loadingService: LoadingService,
    private router: Router,
  ) {
    // Routing
    this.subscription.add(
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationStart) {
          this.isLoading = true;
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError
        ) {
          this.isLoading = false;
        }
      }),
    );

    // Loading
    this.subscription.add(
      this.loadingService.loading$.subscribe((loading: boolean) => {
        this.isLoading = loading;
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
