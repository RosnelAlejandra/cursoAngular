import { Injectable } from '@angular/core';
import { Observable, catchError, delay, finalize, mergeMap, of, tap } from 'rxjs';
import { AlertsService } from './alerts.service';
import { LoadingService } from './loading.service';
import { CareerModel } from '../../layouts/main/views/courses/models/course.model';
import { dataCareers } from '../../layouts/main/views/courses/mocks/course.mock';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  constructor(private alerts: AlertsService,
    private loadingService: LoadingService,
    private httpClient: HttpClient) { }

    careers: CareerModel[] = dataCareers

  getCareers(): Observable<CareerModel[]>{
    return this.httpClient.get<CareerModel[]>('http://localhost:3000/careers')
    .pipe(delay(1000), finalize(() => this.loadingService.setIsLoading(false)),
    catchError(() => {
      this.loadingService.setIsLoading(false)
      console.error('Error')
      this.alerts.showError("Error al cargar Data")
      return of([]);
    })
    )
  }

  create(career: CareerModel, count: number) {
    this.loadingService.setIsLoading(true);
    return this.httpClient.post<CareerModel>('http://localhost:3000/users',{
      ...career, id: (count + 1 ).toString()
    })
    .pipe(
      delay(1000), 
      mergeMap(() => this.getCareers()),
      finalize(() => this.loadingService.setIsLoading(false))
    )
  }

  delete(id: number) {
    this.loadingService.setIsLoading(true);
    this.careers = this.careers.filter((c) => c.id !== id);
    return this.getCareers().pipe(
      tap(() =>
        this.alerts.showSuccess('Realizado', 'Se elimino correctamente')
      ),
      finalize(() => this.loadingService.setIsLoading(false) )
    );
  }

  edit(career: CareerModel) {
    this.loadingService.setIsLoading(true);
    this.careers = this.careers.map((data: any) => {
      if(data.id === career.id){
        return { ...career}
      }
      return data;
    });
    return this.getCareers().pipe(
      tap(() =>
        this.alerts.showSuccess('Cambios Realizados', 'Se edito correctamente los datos de la carrera')
      ),
      finalize(() => this.loadingService.setIsLoading(false) )
    );
  }

}
