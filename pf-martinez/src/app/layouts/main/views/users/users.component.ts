import { Component } from '@angular/core';
import { UsersModel } from './models/models';
import { forkJoin } from 'rxjs';
import { UsersService } from '../../../../core/services/users.service';
import { LoadingService } from '../../../../core/services/loading.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent {

  displayedColumns: string[] = ['id', 'fullName', 'email', 'role', 'action'];

  //los objectos de la tabla
  dataSource: UsersModel[] = [];
  editUser: UsersModel | null = null;
  roles: string[] = [];

  constructor(
    private us: UsersService, 
    private loadingService: LoadingService,
    ){}

  ngOnInit(): void {
    this.getPageData();

    this.us.getUsers().subscribe({
      next: (user) => this.dataSource = user,
      complete: () => this.loadingService.setIsLoading(false),
    })
  }

  /* se llaman mas de un observable  */
  getPageData(): void {
    this.loadingService.setIsLoading(true);
    /* recibe un array de observables  */
    forkJoin([
      this.us.getRoles(),
      this.us.getUsers(),
    ]).subscribe({
      /* el value es una tubla de los resultados de los observables */
      next: (value) => {
        this.roles = value[0]; /* roles */
        this.dataSource = value[1];
      },
      complete: () => {
        this.loadingService.setIsLoading(false);
      },
    });
  }

  onDeleteUser(ev: UsersModel): void {
    this.loadingService.setIsLoading(true);
    this.us.deleteUser(ev.id).subscribe({
      next: (users) => {
        this.dataSource = [...users];
      },
      complete: () => {
        this.loadingService.setIsLoading(false);
      },
    });
  }

  onUserSubmiter(e: UsersModel): void {
    if(e.id === 0){
      this.us
        .createUser({ ...e, id: this.dataSource.length + 1 })
        .subscribe({
          next: (users) => {
            //console.log({users});
            this.dataSource = [...users];
          }
        });
    }else{
      this.us.editUser(e).subscribe({
        next: (users) => {
          this.dataSource = [...users];
        },
        error: (error) => {
          console.log("error : ",error);
        }
      })
    }
  }

  edit(user: UsersModel): void {
    this.editUser = user;
  }

  
}
