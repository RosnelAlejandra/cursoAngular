import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  console.log(`adminGuard ${authService.authUser}`)
   return authService.authUser?.role === 'ADMIN'
            ? true
            : router.createUrlTree(['errors', '403']);
};
