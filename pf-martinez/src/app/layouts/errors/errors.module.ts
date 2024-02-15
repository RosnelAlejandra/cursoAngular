import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http404Component } from './http-404/http-404.component';
import { Http403Component } from './http-403/http-403.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ErrorsRoutingModule } from './errors-routing.module';



@NgModule({
  declarations: [
    Http404Component,
    Http403Component
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ErrorsRoutingModule
  ],
})
export class ErrorsModule { }
