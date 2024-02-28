
import { Injectable } from '@angular/core';
import { Observable,  delay, finalize, map, of, tap } from 'rxjs';
import { UsersModel } from '../../layouts/main/views/users/models/models';
import { Router } from '@angular/router';
import { AlertsService } from './alerts.service';
import { LoadingService } from './loading.service';
import { HttpClient } from '@angular/common/http';
import { UsersService } from './users.service';
import { Store } from '@ngrx/store';
import { actionsAuth } from '../store/auth/actions';
import { actionsProfile } from '../store/profile/actions';

interface LoginData {
  email: null | string;
  password: null | string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  authUser: UsersModel | null = null;
  apiUrl= 'http://localhost:3000/users';
  constructor(
      private router: Router,
      private alertsService: AlertsService,
      private loadingService: LoadingService,
      private usersService: UsersService,
      private httpClient: HttpClient,
      private store: Store
    ) { }

  getUserLogged(): Observable<UsersModel | null>{
    this.loadingService.setIsLoading(true);
    return of(this.authUser).pipe(
            delay(1000), 
            finalize(() => this.loadingService.setIsLoading(false) )
          )
  }

  private setAuthUser(user: UsersModel): void {
    this.authUser = user;
    
    /* llenamos el store */
    this.store.dispatch(actionsAuth.setAuth({
      token: 'THDGSÑOCNDJFNHDB47383sgsg62',
      time: new Date().getTime(),
    }));

    this.store.dispatch(actionsProfile.setProfile({
      id: user.id,
      firstName:  user.firstName,
      lastName:  user.lastName,
      email:  user.email,
      role:  user.role,
    }));

    localStorage.setItem('token', user.email);
  }

  login(user: LoginData) {
    return this.usersService.getUserByEmail(user?.email ?? '').subscribe({
      next: (response) => {
        if (!!response) {
          this.setAuthUser(response);
          this.router.navigate(['dashboard']);
        } else {
          this.alertsService.showError('Email o password invalidos');
        }
      }
    })
  }
  
  logout(): void {
    this.authUser = null;
    this.router.navigate(['auth', 'login']);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.store.dispatch(actionsProfile.clean());
    this.store.dispatch(actionsAuth.clean());
  }
  verifyToken(){
    this.loadingService.setIsLoading(true);
    console.log("Token",localStorage.getItem('token'))
    return this.httpClient
      .get<UsersModel[]>(
        `${this.apiUrl}?email=${localStorage.getItem('token')}`
      )
      .pipe(
        map((response) => {
          if (response.length) {
            this.setAuthUser(response[0]);
            return true;
          } else {
            this.authUser = null;
            localStorage.removeItem('token');
            this.store.dispatch(actionsProfile.clean());
            this.store.dispatch(actionsAuth.clean());
            return false;
          }
        }),
        finalize(()=> this.loadingService.setIsLoading(false))
      );
    
  }
}
