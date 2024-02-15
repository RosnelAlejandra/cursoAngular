import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../../../../core/services/users.service';
import { LoadingService } from '../../../../../../core/services/loading.service';
import { UsersModel } from '../../models/models';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

  user?: UsersModel;
  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {
    this.usersService.getUserById(this.route.snapshot.params['id']).subscribe({
      next: (findedUser) => {
        console.log(findedUser);
        this.user = findedUser;
      }
    });
  }
}
