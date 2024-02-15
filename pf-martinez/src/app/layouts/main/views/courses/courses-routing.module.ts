import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';

const routes: Routes = [
  {
    path:'',
    component: CoursesComponent
  },
  //Dio error al colocar esta ruta, se deja en el principal
/*   {  
    path: ':id',
    component: CourseDetailComponent,
  }, */
];

@NgModule({
  /* define la raiz */
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
