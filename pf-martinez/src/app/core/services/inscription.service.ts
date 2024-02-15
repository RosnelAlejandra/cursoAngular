import { Injectable } from '@angular/core';
import { AlertsService } from './alerts.service';
import { LoadingService } from './loading.service';
import { inscriptionArrayInitial } from '../../layouts/main/views/inscriptions/mocks/inscription.mock';
import { Observable, catchError, delay, filter, finalize, map, mergeMap, of, tap } from 'rxjs';
import { InscriptionModel } from '../../layouts/main/views/inscriptions/models/inscriptions.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  inscrptionArray = inscriptionArrayInitial;

  constructor(private alerts: AlertsService,
    private loadingService: LoadingService,
    private httpClient: HttpClient) { }

    apiUrl= 'http://localhost:3000/inscriptions'

    getInscription(): Observable<InscriptionModel[]>{
      return this.httpClient.get<InscriptionModel[]>(this.apiUrl)
            .pipe(delay(1000), 
            finalize(() => this.loadingService.setIsLoading(false)),
            catchError(() => {
              this.loadingService.setIsLoading(false)
              console.error('Error')
              this.alerts.showError("Error al cargar Data")
              return of([]);
            })
          )
    }

    getInscriptionByCourse(course: number): Observable<InscriptionModel[]>{
      this.loadingService.setIsLoading(true);
      return this.httpClient.get<InscriptionModel[]>(`${this.apiUrl}?courseId=${course}`)
        .pipe(delay(1000), finalize(() => this.loadingService.setIsLoading(false)),
        catchError(() => {
          this.loadingService.setIsLoading(false)
          console.error('Error')
          this.alerts.showError("Error al cargar la inscripción")
          return of();
        }))
    }

    getInscriptionByStuden(id: number): Observable<InscriptionModel[]>{
      this.loadingService.setIsLoading(true);
      return this.httpClient.get<InscriptionModel[]>(`${this.apiUrl}?studentId=${id}`)
        .pipe(delay(1000), finalize(() => this.loadingService.setIsLoading(false)),
        catchError(() => {
          this.loadingService.setIsLoading(false)
          console.error('Error')
          this.alerts.showError("Error al cargar la inscripción del estudiante")
          return of();
        }))
    }

    createInscription(course: InscriptionModel) {
      this.loadingService.setIsLoading(true);
      return this.httpClient.post<InscriptionModel>(this.apiUrl,{
        ...course, id: course.id.toString(),
      })
      .pipe(
        delay(1000), 
        mergeMap(() => this.getInscriptionByCourse(course.courseId)),
        finalize(() => this.loadingService.setIsLoading(false))
      )

    }
  
    deleteInscription(id: string, course: number) {
      if(confirm('¿Esta seguro de Eliminar el Alumno?')){
        this.loadingService.setIsLoading(true);
        return this.httpClient.delete<InscriptionModel>(`${this.apiUrl}/${id}`)
        .pipe(
          delay(1000), 
          mergeMap(() => this.getInscriptionByCourse(course)),
          finalize(() => this.loadingService.setIsLoading(false))
        )
      }
      return this.getInscription();
    }

}
