import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.hasValidToken()) {
    return true;
  } else {
    authService.logout(); // Ensure the user is logged out if the token is invalid
    return router.createUrlTree(['/login']);
  }
};
