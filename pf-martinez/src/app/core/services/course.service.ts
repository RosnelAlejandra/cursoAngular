import { Injectable } from '@angular/core';
import { CourseModel, ModalityModel } from '../../layouts/main/views/courses/models/course.model';
import { EMPTY, Observable, catchError, delay, filter, finalize, mergeMap, of, switchMap, tap } from 'rxjs';
import { dataCourse } from '../../layouts/main/views/courses/mocks/course.mock';
import { AlertsService } from './alerts.service';
import { LoadingService } from './loading.service';
import { HttpClient } from '@angular/common/http';
import { InscriptionService } from './inscription.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private alerts: AlertsService,
    private loadingService: LoadingService,
    private inscriptionService: InscriptionService,
    private httpClient: HttpClient) { }

  courses: CourseModel[] = dataCourse

  apiUrl= 'http://localhost:3000/courses'

  getModalities(): Observable<ModalityModel[]>{
    this.loadingService.setIsLoading(true);
    return this.httpClient.get<ModalityModel[]>('http://localhost:3000/modality').pipe(delay(1000), finalize(() => this.loadingService.setIsLoading(false)))
  }

  getCources(): Observable<CourseModel[]>{
    this.loadingService.setIsLoading(true);
    return this.httpClient.get<CourseModel[]>(this.apiUrl)
        .pipe(delay(1000), finalize(() => this.loadingService.setIsLoading(false)),
        catchError(() => {
          this.loadingService.setIsLoading(false)
          console.error('Error')
          this.alerts.showError("Error al cargar Data de cursos")
          return of([]);
        })
        )
  }

  create(course: CourseModel, count: number) {
    this.loadingService.setIsLoading(true);
    return this.httpClient.post<CourseModel>(this.apiUrl,{
      ...course, id: (count + 1 ).toString()
    })
    .pipe(
      delay(1000), 
      mergeMap(() => this.getCources()),
      finalize(() => this.loadingService.setIsLoading(false))
    )
  }

  delete(id: number): Observable<CourseModel[]> {
    return this.inscriptionService.getInscriptionByCourse(id).pipe(
      switchMap((resp) => {
        console.log("Cantidad de alumnos", resp.length);
        if (resp.length > 0) {
          this.alerts.showError("Cursos con Alumnos, no se puede eliminar");
          return this.getCources();
        } else {
          if (confirm('¿Está seguro de eliminar este Curso?')) {
            console.log("eliminando", id);
            return this.httpClient.delete<CourseModel>(`${this.apiUrl}/${id}`).pipe(
              delay(1000),
              mergeMap(() => this.getCources())
            );
          } else {
            return this.getCources();
          }
        }
      }),
      catchError(() => this.getCources()),
      finalize(() => this.loadingService.setIsLoading(false))
    );
  }

  edit(course: CourseModel) {
    this.loadingService.setIsLoading(true);
    return this.httpClient.put(`${this.apiUrl}/${course.id}`, course).pipe(
      mergeMap(() => this.getCources()),
      tap(() =>this.alerts.showSuccess('Cambios Realizados', 'Se editó correctamente.')),
      finalize(() => this.loadingService.setIsLoading(false),
      )
    );
  }

  getCourseById(course: number): Observable<CourseModel | undefined> {
    this.loadingService.setIsLoading(true);
    return this.httpClient.get<CourseModel | undefined>(`${this.apiUrl}/${course}`)
        .pipe(delay(1000), finalize(() => this.loadingService.setIsLoading(false)),
        catchError(() => {
          this.loadingService.setIsLoading(false)
          console.error('Error')
          this.alerts.showError("Error al cargar Data del curso")
          return of();
        }))
  }
}
