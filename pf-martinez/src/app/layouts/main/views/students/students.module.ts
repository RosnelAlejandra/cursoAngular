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
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    StudentsComponent,
    PageFormComponent,
    PageTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTabsModule
  ],
  exports:[StudentsComponent]
})
export class StudentsModule { }
