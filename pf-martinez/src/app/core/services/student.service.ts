import { Injectable } from '@angular/core';
import { studentsArrayInitial } from '../../layouts/main/views/students/mocks/data.mocks';
import { Observable, delay, finalize, map, of, tap } from 'rxjs';
import { StudentModel } from '../../layouts/main/views/students/models/studens.model';
import { AlertsService } from './alerts.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private alerts: AlertsService,
    private loadingService: LoadingService) { }

  studentsArray = studentsArrayInitial.map( (s: any) => { 
    return { ...s, dateIncription: new Date(s.dateIncription)}
  }) 

  getStudent(): Observable<StudentModel[]>{
    return of(this.studentsArray).pipe(
            map( (student) => student.map( (s: any) => { 
              return { ...s, dateIncription: new Date(s.dateIncription)}
            }) ),
            delay(1000), 
            finalize(() => this.loadingService.setIsLoading(false) )
          )
  }

  createStudent(student: StudentModel) {
    this.loadingService.setIsLoading(true);
    this.studentsArray.push(student);
    return this.getStudent();
  }

  deleteStudent(id: number) {
    if(confirm('¿Esta seguro de Eliminar el Alumno?')){
      this.loadingService.setIsLoading(true);
      this.studentsArray = this.studentsArray.filter((user) => user.id !== id);
      return this.getStudent().pipe(
        tap(() =>
          this.alerts.showSuccess('Realizado', 'Se elimino correctamente')
        )
      );
    }
    return this.getStudent();
  }

  editStudent(student: StudentModel) {
    this.loadingService.setIsLoading(true);
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


  getStudentById(studenId: number) {
    this.loadingService.setIsLoading(true);
    const data = this.studentsArray.find((c) => c.id == studenId);
    return of(data).pipe(
      delay(1000),
      finalize(() => this.loadingService.setIsLoading(false) )
    );
  }

}
