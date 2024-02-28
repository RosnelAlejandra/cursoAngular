import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { selectRolProfile } from '../store/profile/selectors';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store);
  return store.select(selectRolProfile).pipe(
    map((rol) => {
      console.log(`adminGuard ${rol}`)
      return rol === 'ADMIN'
        ? true
        : router.createUrlTree(['dashboard', 'home']);
    })
  );
/*   const authService = inject(AuthService);
  console.log(`adminGuard ${authService.authUser}`)
   return authService.authUser?.role === 'ADMIN'
            ? true
            : router.createUrlTree(['errors', '403']); */
};
