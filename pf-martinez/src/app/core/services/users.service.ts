import { Inject, Injectable } from '@angular/core';
import { VAR_TOKEN_INJECTION } from '../injection-tokents';

import {  Observable, catchError, delay, finalize, map, mergeMap, of, tap } from 'rxjs';
import { AlertsService } from './alerts.service';
import { UsersModel } from '../../layouts/main/views/users/models/models';
import { usersArrayInitial } from '../../layouts/main/views/users/mocks/data.mocks';
import { LoadingService } from './loading.service';
import { HttpClient } from '@angular/common/http';

const ROLES_DB: string[] = ['ADMIN', 'USER'];

let USER_DB: UsersModel[] = usersArrayInitial;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

    constructor(private alerts: AlertsService, 
                private loadingService: LoadingService,       
                private httpClient: HttpClient) {}

    user: UsersModel[] = USER_DB

    apiUrl= 'http://localhost:3000/users'

      getUsers() {
        this.loadingService.setIsLoading(true);
          return this.httpClient.get<UsersModel[]>(this.apiUrl)
                .pipe(
                  delay(1000), 
                  finalize(() => this.loadingService.setIsLoading(false)),
                  catchError(() => {
                      console.error('Error')
                      this.alerts.showError("Error al cargar Data")
                      return of([]);
                    })
                  )
        }

      getUserById(id: number | string): Observable<UsersModel | undefined> {
        this.loadingService.setIsLoading(true);
       return this.httpClient.get<UsersModel>(`${this.apiUrl}/${id}`)
        .pipe(delay(1000), finalize(() => this.loadingService.setIsLoading(false)),
        catchError(() => {
          this.loadingService.setIsLoading(false)
          console.error('Error')
          this.alerts.showError("Error al cargar Data de usuario")
          return of();
        }))
      }

      getUserByEmail(email: string): Observable<UsersModel  | null> {
        console.log('getUserByEmail', email) ;
        this.loadingService.setIsLoading(true);
        //return of(this.user.find((user) => user.email == email)).pipe(delay(1000), finalize(() => this.loadingService.setIsLoading(false) ));
        return this.httpClient.get<UsersModel[]>(`${this.apiUrl}?email=${email}`)
          .pipe(
            map(users => users.length > 0 ? users[0] : null),
            delay(1000),
            finalize(() => this.loadingService.setIsLoading(false))
          );
      }
    
      getRoles(): Observable<string[]> {
        this.loadingService.setIsLoading(true);
        return of(ROLES_DB).pipe(delay(1000), finalize(() => this.loadingService.setIsLoading(false)));
       }
    
      editUser(user: UsersModel) {
        this.loadingService.setIsLoading(true);
        return this.httpClient.put(`${this.apiUrl}/${user.id}`, user).pipe(
          mergeMap(() => this.getUsers()),
          tap(() =>this.alerts.showSuccess('Cambios Realizados', 'Se editó correctamente.')),
          finalize(() => this.loadingService.setIsLoading(false),
          )
        );
      }

      createUser(user: UsersModel) {
        this.loadingService.setIsLoading(true);
        return this.httpClient.post<UsersModel>(`${this.apiUrl}`,{
          ...user, id: user.id.toString(),
        })
        .pipe(
          delay(1000), 
          mergeMap(() => this.getUsers()),
          finalize(() => this.loadingService.setIsLoading(false))
        )

      }
    
      deleteUser(userID: number) {
        this.loadingService.setIsLoading(true);
        /* quitamos el elemento que se borro */
        /* USER_DB = USER_DB.filter((user) => user.id !== userID);
        return this.getUsers().pipe(
          tap(() =>
            this.alerts.showSuccess('Realizado', 'Se elimino correctamente')
          )
        ); */
        if(confirm('¿Esta seguro de Eliminar el Alumno?')){
          return this.httpClient.delete<UsersModel>(`${this.apiUrl}/${userID}`)
          .pipe(
            delay(1000), 
            mergeMap(() => this.getUsers()),
            finalize(() => this.loadingService.setIsLoading(false))
          )
        }
        return this.getUsers();
      }

}
