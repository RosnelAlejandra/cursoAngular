import { Injectable } from '@angular/core';
import { Observable, delay, finalize, of, tap } from 'rxjs';
import { AlertsService } from './alerts.service';
import { LoadingService } from './loading.service';
import { CareerModel } from '../../layouts/main/views/courses/models/course.model';
import { dataCareers } from '../../layouts/main/views/courses/mocks/course.mock';

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  constructor(private alerts: AlertsService,
    private loadingService: LoadingService) { }

    careers: CareerModel[] = dataCareers

  getCareers(): Observable<CareerModel[]>{
    return of(this.careers).pipe(delay(1000), finalize(() => this.loadingService.setIsLoading(false) ))
  }

  create(career: CareerModel, count: number) {
    this.loadingService.setIsLoading(true);
    this.careers = [ ...this.careers,  {...career, id: count + 1 } ]
    return this.getCareers();
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
