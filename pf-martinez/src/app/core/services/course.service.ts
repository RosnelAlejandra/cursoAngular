import { Injectable } from '@angular/core';
import { CourseModel, ModalityModel } from '../../layouts/main/views/courses/models/course.model';
import { Observable, delay, filter, finalize, of, tap } from 'rxjs';
import { dataCourse } from '../../layouts/main/views/courses/mocks/course.mock';
import { AlertsService } from './alerts.service';
import { LoadingService } from './loading.service';

const DB_MODALITY = [{
  id: 1,
  name: "Presencial"
}, {
  id: 2,
  name: "Online"
}]
@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private alerts: AlertsService,
    private loadingService: LoadingService) { }

  courses: CourseModel[] = dataCourse

  getModalities(): Observable<ModalityModel[]>{
    this.loadingService.setIsLoading(true);
    return of(DB_MODALITY).pipe(delay(1000), finalize(() => this.loadingService.setIsLoading(false) ))
  }

  getCources(): Observable<CourseModel[]>{
    this.loadingService.setIsLoading(true);
    return of(this.courses).pipe(
        delay(1000), 
        finalize(() => this.loadingService.setIsLoading(false) )
        )
  }

  create(course: CourseModel, count: number) {
    this.loadingService.setIsLoading(true);
    this.courses = [ ...this.courses, {...course, id: count + 1 } ];
    return this.getCources();
  }

  delete(id: number) {
    if(confirm('¿Esta seguro de Eliminar este Curso?')){
      this.loadingService.setIsLoading(true);
      this.courses = this.courses.filter((c) => c.id !== id);
      return this.getCources().pipe(
        tap(() =>
          this.alerts.showSuccess('Realizado', 'Se elimino correctamente')
        )
      );
    }
    return this.getCources();
  }

  edit(course: CourseModel) {
    this.loadingService.setIsLoading(true);
    this.courses = this.courses.map((data: any) => {
      if(data.id === course.id){
        return { ...course}
      }
      return data;
    });
    return this.getCources().pipe(
      tap(() =>
        this.alerts.showSuccess('Cambios Realizados', 'Se edito correctamente los datos del curso')
      ),
      finalize(() => this.loadingService.setIsLoading(false) )
    );
  }

  getCourseById(course: number): Observable<CourseModel | undefined> {
    this.loadingService.setIsLoading(true);
    const data = this.courses.find((c) => c.id == course);
    console.log({data});
    return of(data).pipe(
      delay(1000),
      finalize(() => this.loadingService.setIsLoading(false) )
    );
  }
}
