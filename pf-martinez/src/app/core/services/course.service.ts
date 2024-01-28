import { Injectable } from '@angular/core';
import { CourseModel } from '../../layouts/main/views/courses/models/course.model';
import { Observable, delay, of } from 'rxjs';
import { dataCourse } from '../../layouts/main/views/courses/mocks/course.mock';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor() { }

  getCources(): Observable<CourseModel[]>{
    console.log("CourseService getCources");
    return of(dataCourse).pipe(delay(1000))
  }
}
