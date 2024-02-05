import { Component } from '@angular/core';
import { UsersModel } from './models/models';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent {

  displayedColumns: string[] = ['id', 'fullName', 'email', 'role', 'action'];

  //los objectos de la tabla
  dataSource: UsersModel[] = [];
  roles: string[] = [];

  constructor(
    ){
  }

  ngOnInit(): void {

  }

  /* se llaman mas de un observable  */
  getPageData(): void {
   
  }

  onDeleteUser(ev: UsersModel): void {
   
  }

  onUserSubmiter(e: UsersModel): void {
    
  }
  
}
