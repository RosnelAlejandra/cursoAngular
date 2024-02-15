import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students.component';

@NgModule({
  /* define la raiz */
  imports: [RouterModule.forChild([
    {
      path:'',
      component: StudentsComponent,
    }
  ])],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }