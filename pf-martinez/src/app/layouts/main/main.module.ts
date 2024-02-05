import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { StudentsModule } from './views/students/students.module';
import { MatListModule } from '@angular/material/list';
import { ListMaterialModule } from '../../components/list-material/list-material.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../../shared/shared.module';
import { CoursesModule } from './views/courses/courses.module';
import { InscriptionsModule } from './views/inscriptions/inscriptions.module';
import { RouterModule } from '@angular/router';
import { UsersModule } from './views/users/users.module';
import { HomeComponent } from './views/home/home.component';
import { CoursesComponent } from './views/courses/courses.component';
import { InscriptionsComponent } from './views/inscriptions/inscriptions.component';
import { StudentsComponent } from './views/students/students.component';
import { UsersComponent } from './views/users/users.component';
import { TeachersComponent } from './views/teachers/teachers.component';
import { ProfileComponent } from './views/profile/profile.component';
import { NavListModule } from '../../components/nav-list/nav-list.module';
import { DetailComponent } from './views/teachers/detail/detail.component';
import { UserDetailComponent } from './views/users/components/user-detail/user-detail.component';
import { PageDetailComponent } from './views/students/pages/page-detail/page-detail.component';
import { CourseDetailComponent } from './views/courses/course-detail/course-detail.component';
import { AvatarModule } from '@coreui/angular';
import { CarouselModule } from '@coreui/angular';
@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    CommonModule,
    ListMaterialModule,
    NavListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    StudentsModule,
    CoursesModule,
    InscriptionsModule,
    UsersModule,
    SharedModule,
    AvatarModule,
    CarouselModule,
    /* define las rutas hijas  */
    RouterModule.forChild([
      {
        path:'dashboard',
        component: HomeComponent
      },
      {
        path:'profile',
        component: ProfileComponent
      },
      {
        path:'teachers',
        component: TeachersComponent,
      },
      {
        path:'teachers/:id', /* no se coloca como oulet por que si no se debe definir como hijo */
        component: DetailComponent,
      },
      {
        path:'courses',
        component: CoursesComponent,
      },
      {
        path:'courses/:id',
        component: CourseDetailComponent,
      },
      {
        path:'inscription',
        component: InscriptionsComponent
      },
      {
        path:'students',
        component: StudentsComponent
      },
      {
        path:'students/:id',
        component: PageDetailComponent
      },
      {
        path:'users',
        component: UsersComponent
      },
      {
        path:'users/:id',
        component: UserDetailComponent
      }
    ])
  ],
  exports:[
    MainComponent,
  ]
})
export class MainModule { }
