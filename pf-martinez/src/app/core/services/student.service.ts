import { Injectable } from '@angular/core';
import { studentsArrayInitial } from '../../layouts/main/views/students/mocks/data.mocks';
import { Observable, delay, map, of, tap } from 'rxjs';
import { StudentModel } from '../../layouts/main/views/students/models/studens.model';
import { AlertsService } from './alerts.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private alerts: AlertsService) { }

  studentsArray = studentsArrayInitial.map( (s: any) => { 
    return { ...s, dateIncription: new Date(s.dateIncription)}
  }) 

  getStudent(): Observable<StudentModel[]>{
    return of(this.studentsArray).pipe(
            map( (student) => student.map( (s: any) => { 
              return { ...s, dateIncription: new Date(s.dateIncription)}
            }) ),
            delay(1000)
    )
  }

  createStudent(student: StudentModel) {
    this.studentsArray.push(student);
    return this.getStudent();
  }

  deleteStudent(id: number) {
    this.studentsArray = this.studentsArray.filter((user) => user.id !== id);
    return this.getStudent().pipe(
      tap(() =>
        this.alerts.showSuccess('Realizado', 'Se elimino correctamente')
      )
    );
  }

  editStudent(student: StudentModel) {
    this.studentsArray = this.studentsArray.map((data: any) => {
      if(data.id === student.id){
        return { ...student}
      }
      return data;
    });
    return this.getStudent().pipe(
      tap(() =>
        this.alerts.showSuccess('Cambios Realizados', 'Se edito correctamente los datos del estudiente')
      )
    );
  }

}
