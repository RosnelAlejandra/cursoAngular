import { Component } from '@angular/core';
import { UsersModel } from './models/models';
import { UsersService } from '../../../../core/services/users.service';
import { LoadingService } from '../../../../core/services/loading.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  displayedColumns: string[] = ['id', 'fullName', 'email', 'role', 'action'];

  //los objectos de la tabla
  dataSource: UsersModel[] = [];
  roles: string[] = [];

  constructor(
    private usersService: UsersService, 
    private loadingService: LoadingService,
    ){
  }

  ngOnInit(): void {
    this.getPageData();

    this.usersService.getUsers().subscribe({
      next: (user) => this.dataSource = user,
      complete: () => this.loadingService.setIsLoading(false),
    })
  }

  /* se llaman mas de un observable  */
  getPageData(): void {
    this.loadingService.setIsLoading(true);
    /* recibe un array de observables  */
    forkJoin([
      this.usersService.getRoles(),
      this.usersService.getUsers(),
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
    this.usersService.deleteUser(ev.id).subscribe({
      next: (users) => {
        this.dataSource = [...users];
      },
      complete: () => {
        this.loadingService.setIsLoading(false);
      },
    });
  }

  onUserSubmiter(e: UsersModel): void {
    //se debe redefinir la tabla para que se muestre
    //this.dataSource = [...this.dataSource, { ...e, id: this.dataSource.length + 1}];
    this.loadingService.setIsLoading(true);
    this.usersService
      .createUser({ ...e, id: this.dataSource.length + 1 })
      .subscribe({
        next: (users) => {
          this.dataSource = [...users];
        },
        complete: () => {
          this.loadingService.setIsLoading(false);
        },
      });
  }
}
