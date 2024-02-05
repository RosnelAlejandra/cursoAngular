import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersComponent } from './teachers.component';
import { DetailComponent } from './detail/detail.component';



@NgModule({
  declarations: [
    TeachersComponent,
    DetailComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TeachersModule { }
