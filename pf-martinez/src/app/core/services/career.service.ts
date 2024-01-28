import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { CareerModel } from '../../layouts/main/views/courses/models/course.model';
import { dataCareers } from '../../layouts/main/views/courses/mocks/course.mock';

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  constructor() { }

  getCareers(): Observable<CareerModel[]>{
    console.log("CareerService getCareers");
    return of(dataCareers).pipe(delay(1000))
  }

}
