import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';

import { PageFormComponent } from './pages/page-form/page-form.component';
import { PageTableComponent } from './pages/page-table/page-table.component';

import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { SharedModule } from '../../../../shared/shared.module';
import { PageDetailComponent } from './pages/page-detail/page-detail.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { StudentsRoutingModule } from './students-routing.module';
@NgModule({
  declarations: [
    StudentsComponent,
    PageFormComponent,
    PageTableComponent,
    PageDetailComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatCardModule,

    StudentsRoutingModule
  ]
})
export class StudentsModule { }
