import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CourseDetailComponent } from './views/courses/course-detail/course-detail.component';
import { PageDetailComponent } from './views/students/pages/page-detail/page-detail.component';
import { UserDetailComponent } from './views/users/components/user-detail/user-detail.component';
import { adminGuard } from '../../core/guards/admin.guard';

const routes: Routes = [
  {
    path:'profile',
    loadChildren: () => import('./views/profile/profile.module').then(
      (m) => m.ProfileModule
    )
  },
  {
    path:'dashboard',
    loadChildren: () => import('./views/home/home.module').then(
      (m) => m.HomeModule
    )
  },
  {
    path:'teachers',
    loadChildren: () => import('./views/teachers/teachers.module').then(
      (m) => m.TeachersModule
    )
  },
  {
    path:'inscription',
    canActivate: [adminGuard],
    loadChildren: () => import('./views/inscriptions/inscriptions.module').then(
      (m) => m.InscriptionsModule
    )
  },
  {
    path:'courses',
    loadChildren: () => import('./views/courses/courses.module').then(
      (m) => m.CoursesModule
    )
  },
  /* Dio error al colocar esta ruta en el routing de curso, se deja afuera */
  {
    path:'courses/:id',
    component: CourseDetailComponent,
  },
  {
    path:'students',
    loadChildren: () => import('./views/students/students.module').then(
      (m) => m.StudentsModule
    )
  },
  {
    path:'students/:id',
    component: PageDetailComponent
  },
  {
    path:'users',
    canActivate: [adminGuard],
    loadChildren: () => import('./views/users/users.module').then(
      (m) => m.UsersModule
    )
  },
  {
    path:'users/:id',
    component: UserDetailComponent
  },
];

@NgModule({
  /* define la raiz */
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
