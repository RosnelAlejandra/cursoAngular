import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesComponent } from './courses.component';
import { TableComponent } from './table/table.component';
import { FormCourseComponent } from './form-course/form-course.component';
import { FormCareerComponent } from './form-career/form-career.component';

import { SharedModule } from '../../../../shared/shared.module';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { AlertModule } from '@coreui/angular';

@NgModule({
  declarations: [
    CoursesComponent,
    TableComponent,
    FormCourseComponent,
    FormCareerComponent,
    CourseDetailComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MatCardModule,  
    AlertModule
  ],
  exports: [CoursesComponent]
})
export class CoursesModule { }
