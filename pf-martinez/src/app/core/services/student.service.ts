import { Injectable } from '@angular/core';
import { studentsArrayInitial } from '../../layouts/main/views/students/mocks/data.mocks';
import { Observable, catchError, delay, finalize, map, mergeMap, of, tap } from 'rxjs';
import { StudentModel } from '../../layouts/main/views/students/models/studens.model';
import { AlertsService } from './alerts.service';
import { LoadingService } from './loading.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private alerts: AlertsService,
    private loadingService: LoadingService,
    private httpClient: HttpClient) { }

  studentsArray = studentsArrayInitial.map( (s: any) => { 
    return { ...s, dateIncription: new Date(s.dateIncription)}
  }) 

  apiUrl= 'http://localhost:3000/students';

  getStudent(): Observable<StudentModel[]>{
  console.log("getStudent");
    return this.httpClient.get<StudentModel[]>(this.apiUrl)
          .pipe(
            map( (student) => student.map( (s: any) => { 
              return { ...s, dateIncription: new Date(s.dateIncription)}
            }) ),
            delay(1000), 
            finalize(() => this.loadingService.setIsLoading(false) ),
            catchError(() => {
              this.loadingService.setIsLoading(false)
              console.error('Error')
              this.alerts.showError("Error al cargar Data")
              return of([]);
            })
          )
  }

  createStudent(student: StudentModel) {
    this.loadingService.setIsLoading(true);
    return this.httpClient.post<StudentModel>(`${this.apiUrl}`,{
      ...student, id: student.id.toString(),
    })
    .pipe(
      delay(1000), 
      mergeMap(() => this.getStudent()),
      finalize(() => this.loadingService.setIsLoading(false))
    )
  }

  deleteStudent(id: number) {
    if(confirm('¿Esta seguro de Eliminar el Alumno?')){
      this.loadingService.setIsLoading(true);
      return this.httpClient.delete<StudentModel>(`${this.apiUrl}/${id}`)
      .pipe(
        delay(1000), 
        mergeMap(() => this.getStudent()),
        finalize(() => this.loadingService.setIsLoading(false))
      )
    }
    return this.getStudent();
  }

  editStudent(student: StudentModel) {
    this.loadingService.setIsLoading(true);
    return this.httpClient.put(`${this.apiUrl}/${student.id}`, student).pipe(
      mergeMap(() => this.getStudent()),
      tap(() =>this.alerts.showSuccess('Cambios Realizados', 'Se editó correctamente.')),
      finalize(() => this.loadingService.setIsLoading(false),
      )
    );
  }


  getStudentById(studenId: number) {
    this.loadingService.setIsLoading(true);
    return this.httpClient.get<StudentModel>(`${this.apiUrl}/${studenId}`)
        .pipe(delay(1000), finalize(() => this.loadingService.setIsLoading(false)),
        catchError(() => {
          this.loadingService.setIsLoading(false)
          console.error('Error')
          this.alerts.showError("Error al cargar Data de Alumno")
          return of();
        }))
  }

}
