import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirWidthDirective } from './directives/dir-width.directive';
import { StudentDataPipe } from './pipes/studen-data.pipe';



@NgModule({
  declarations: [
    DirWidthDirective,
    StudentDataPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DirWidthDirective,
    StudentDataPipe
  ]
})
export class SharedModule { }
