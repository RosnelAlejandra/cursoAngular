import { Inject, Injectable } from '@angular/core';
import { VAR_TOKEN_INJECTION } from '../injection-tokents';

import {  Observable, delay, of, tap } from 'rxjs';
import { AlertsService } from './alerts.service';
import { UsersModel } from '../../layouts/main/views/users/models/models';

const ROLES_DB: string[] = ['ADMIN', 'USER'];

let USER_DB: UsersModel[] = [
    {
        id: 1,
        firstName: 'Mario',
        lastName: 'Perez',
        email: 'mar@user.com',
        role: 'USER',
      },
      {
        id: 2,
        firstName: 'Rosario',
        lastName: 'Perez',
        email: 'mar@user.com',
        role: 'ADMIN',
      },
]

@Injectable({
  providedIn: 'root'
})
export class UsersService {
/* 
* para recobir información en el servicio:
        @Inject('USER_TOKEN') useToken: string
    donde el USER_TOKEN = key del provider

*  para el @Inject(VAR_TOKEN_INJECTION) varToken: string, 
    utilizamos un archivo para generear los tokens en solo lugar  s
*/
    constructor(
          @Inject('USER_TOKEN') useToken: string, 
          @Inject(VAR_TOKEN_INJECTION) varToken: string,
          private alerts: AlertsService
          ) {
      console.log('users instancies', useToken, varToken);
    }


    getUsers() {
        console.log('get users ');
        //retorna un observable despues de 1s
        return of(USER_DB).pipe(delay(3000))
    }

      getUserById(id: number | string): Observable<UsersModel | undefined> {
        return of(USER_DB.find((user) => user.id == id)).pipe(delay(1000));
      }
    
      getRoles(): Observable<string[]> {
        return of(ROLES_DB).pipe(delay(1000));
      }
    
    
      createUser(payload: UsersModel) {
        USER_DB.push(payload);
        return this.getUsers();
      }
    
      deleteUser(userID: number) {
        console.log('delete user', userID);
        /* quitamos el elemento que se borro */
        USER_DB = USER_DB.filter((user) => user.id !== userID);
        return this.getUsers().pipe(
            /* permite realizar algo despues de emitir un valor */
          tap(() =>
            this.alerts.showSuccess('Realizado', 'Se elimino correctamente')
          )
        );
      }

}
