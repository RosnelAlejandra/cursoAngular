import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layouts/main/main.component';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path:'',
    canActivate:[authGuard],
    component: MainComponent,
    loadChildren: () => import('./layouts/main/main.module').then(
      (m) => m.MainModule
    )
  },
  {
    path:'auth',
    loadChildren: () => import('./layouts/auth/auth.module').then(
      (m) => m.AuthModule
    )
  },
  {
    path:'errors',
    loadChildren: () => import('./layouts/errors/errors.module').then(
      (m) => m.ErrorsModule
    )
  },
  {
    path:'**',
    redirectTo: '/errors/404'  /* se coloca el / para ir fuera del path padre */
  },
];

@NgModule({
  /* define la raiz */
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
