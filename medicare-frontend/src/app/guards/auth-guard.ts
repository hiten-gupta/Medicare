import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const requiresAdmin = route.data?.['requiresAdmin'];

  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  if (requiresAdmin && !authService.isAdmin()) {
    router.navigate(['/home']);
    return false;
  }

  return true;
};