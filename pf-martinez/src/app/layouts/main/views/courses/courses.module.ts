import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesComponent } from './courses.component';
import { TableComponent } from './table/table.component';
import { FormCourseComponent } from './form-course/form-course.component';

import { SharedModule } from '../../../../shared/shared.module';
import { CourseDetailComponent } from './course-detail/course-detail.component';

import { MatCardModule } from '@angular/material/card';
import { AlertModule } from '@coreui/angular';
import { CoursesRoutingModule } from './courses-routing.module';

@NgModule({
  declarations: [
    CoursesComponent,
    TableComponent,
    FormCourseComponent,
    CourseDetailComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatCardModule,  
    AlertModule,
    CoursesRoutingModule
  ],
})
export class CoursesModule { }