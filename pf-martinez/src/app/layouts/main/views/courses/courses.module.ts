import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalloutModule } from '@coreui/angular';

import { CoursesComponent } from './courses.component';
import { TableComponent } from './table/table.component';
import { FormCourseComponent } from './form-course/form-course.component';
import { FormCareerComponent } from './form-career/form-career.component';

import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  declarations: [
    CoursesComponent,
    TableComponent,
    FormCourseComponent,
    FormCareerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CalloutModule
  ],
  exports: [CoursesComponent]
})
export class CoursesModule { }
