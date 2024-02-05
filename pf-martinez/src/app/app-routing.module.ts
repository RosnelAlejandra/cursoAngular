import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layouts/main/main.component';
import { LoginComponent } from './layouts/auth/login/login.component';
import { Http404Component } from './layouts/errors/http-404/http-404.component';
import { Http400Component } from './layouts/errors/http-400/http-400.component';

const routes: Routes = [
  {
    path:'',
    component: MainComponent,
    loadChildren: () => import('./layouts/main/main.module').then(
      (m) => m.MainModule
    )
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: '404',
    component: Http404Component
  },
  {
    path: '400',
    component: Http400Component
  },
  {
    path:'**',
    redirectTo: '/404'  /* se coloca el / para ir fuera del path padre */
  },
];

@NgModule({
  /* define la raiz */
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
