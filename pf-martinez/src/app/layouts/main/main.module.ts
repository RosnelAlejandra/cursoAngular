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
import { UsersModule } from './views/users/users.module';
import { NavListModule } from '../../components/nav-list/nav-list.module';
import { AvatarModule } from '@coreui/angular';
import { CarouselModule } from '@coreui/angular';
import { MainRoutingModule } from './main-routing.module';
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
  
    MainRoutingModule
  ],
  exports:[
    MainComponent,
  ]
})
export class MainModule { }

/**
   // define las rutas hijas  
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
      path:'teachers/:id', // no se coloca como oulet por que si no se debe definir como hijo 
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
 */