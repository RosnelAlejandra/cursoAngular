import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http404Component } from './http-404/http-404.component';
import { Http400Component } from './http-400/http-400.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    Http404Component,
    Http400Component
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports:[
    Http404Component,
    Http400Component
  ]
})
export class ErrorsModule { }
