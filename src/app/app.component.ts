import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
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
import { Observable, Subscription } from 'rxjs';
import { LoadingService } from './services/loading.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from './services/auth.service';
import { MatSymbolDirective } from './directives/mat-symbol.directive';

@Component({
  selector: 'app-root',
  imports: [
    MatSymbolDirective,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterModule,
    AsyncPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  public isLoading: boolean = true;
  public title: string = 'Adjutum';

  private subscription: Subscription = new Subscription();
  isLoggedIn$!: Observable<boolean>;
  public userName: string | null = null;
  public isAdmin: boolean = false;

  constructor(
    private loadingService: LoadingService,
    private router: Router,
    private authService: AuthService,
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

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;

    this.subscription.add(
      this.isLoggedIn$.subscribe((loggedIn) => {
        if (loggedIn) {
          this.userName = this.authService.getUserName(); // <-- from decoded token
          this.isAdmin = this.authService.isAdmin();
        } else {
          this.userName = null;
          this.isAdmin = false;
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}
