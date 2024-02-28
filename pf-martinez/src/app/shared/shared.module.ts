import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentDataPipe } from './pipes/studen-data.pipe';
import { DirTitlesDirective } from './directives/dir-titles.directive';
import { DirWrapDirective } from './directives/dir-wrap.directive';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CourseDataPipe } from './pipes/course-data.pipe';
import { CareerDataPipe } from './pipes/career-data.pipe';
import { UserDataPipe } from './pipes/user-data.pipe';
import { CalloutModule } from '@coreui/angular';
import { MatStepperModule } from '@angular/material/stepper';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCardModule} from '@angular/material/card';
import { ErrorsPipe } from './pipes/errors.pipe';


@NgModule({
  declarations: [
    DirTitlesDirective,
    DirWrapDirective,
    
    StudentDataPipe,
    CourseDataPipe,
    CareerDataPipe,
    UserDataPipe,
    ErrorsPipe,
  ],
  imports: [
    CommonModule,

    MatExpansionModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatCardModule,
    

    FormsModule,
    ReactiveFormsModule,
    
    CalloutModule,
  ],
  exports: [
    DirTitlesDirective,
    DirWrapDirective,

    StudentDataPipe,
    ErrorsPipe,
    
    MatStepperModule,
    MatExpansionModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,

    FormsModule,
    ReactiveFormsModule,

    CalloutModule
  ],
  providers: [

  ]
})
export class SharedModule { }
