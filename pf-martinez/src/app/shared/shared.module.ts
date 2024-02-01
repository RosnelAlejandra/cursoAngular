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
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [
    DirTitlesDirective,
    DirWrapDirective,
    
    StudentDataPipe,
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

    FormsModule,
    ReactiveFormsModule,
    

  ],
  exports: [
    DirTitlesDirective,
    DirWrapDirective,

    StudentDataPipe,

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

    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [

  ]
})
export class SharedModule { }
