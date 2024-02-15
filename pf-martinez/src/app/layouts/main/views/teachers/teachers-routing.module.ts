import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeachersComponent } from './teachers.component';
import { DetailComponent } from './detail/detail.component';


const routes: Routes = [

  {
    path:'',
    component: TeachersComponent,
  }
];

@NgModule({
  /* define la raiz */
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersRoutingModule { }