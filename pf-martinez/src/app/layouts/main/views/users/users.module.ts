import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { SharedModule } from '../../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { UsersRoutingModule } from './users-routing.module';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    UsersComponent,
    UserDetailComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MatCardModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
