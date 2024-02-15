
import { Injectable } from '@angular/core';
import { Observable,  delay, finalize, map, of, tap } from 'rxjs';
import { UsersModel } from '../../layouts/main/views/users/models/models';
import { Router } from '@angular/router';
import { AlertsService } from './alerts.service';
import { LoadingService } from './loading.service';
import { HttpClient } from '@angular/common/http';
import { UsersService } from './users.service';

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
      private httpClient: HttpClient
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
            return false;
          }
        })
      );
    
  }
}
