import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Http404Component } from './http-404/http-404.component';
import { Http403Component } from './http-403/http-403.component';

//errors
const routes: Routes = [
    {
        path:'404',
        component: Http404Component
    },
    {
      path:'403',
      component: Http403Component
    }
];

@NgModule({
  /* define la raiz */
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorsRoutingModule { }
