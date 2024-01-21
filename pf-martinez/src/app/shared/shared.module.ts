import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentDataPipe } from './pipes/studen-data.pipe';
import { DirTitlesDirective } from './directives/dir-titles.directive';



@NgModule({
  declarations: [
    DirTitlesDirective,
    StudentDataPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DirTitlesDirective,
    StudentDataPipe
  ]
})
export class SharedModule { }
