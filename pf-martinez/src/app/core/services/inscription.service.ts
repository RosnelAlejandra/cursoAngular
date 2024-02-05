import { Injectable } from '@angular/core';
import { AlertsService } from './alerts.service';
import { LoadingService } from './loading.service';
import { inscriptionArrayInitial } from '../../layouts/main/views/inscriptions/mocks/inscription.mock';
import { Observable, delay, filter, finalize, map, of, tap } from 'rxjs';
import { InscriptionModel } from '../../layouts/main/views/inscriptions/models/inscriptions.model';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  inscrptionArray = inscriptionArrayInitial;

  constructor(private alerts: AlertsService,
    private loadingService: LoadingService) { }


    getInscription(): Observable<InscriptionModel[]>{
      return of(this.inscrptionArray).pipe(
              delay(1000), 
              finalize(() => this.loadingService.setIsLoading(false) )
            )
    }

    getInscriptionByCourse(course: number): Observable<InscriptionModel[]>{
      this.loadingService.setIsLoading(true);
      this.inscrptionArray = this.inscrptionArray.filter((i) => i.courseId == course);
      console.log(this.inscrptionArray);
      return this.getInscription();
    }

    getInscriptionByStuden(id: number): Observable<InscriptionModel[]>{
      this.loadingService.setIsLoading(true);
      this.inscrptionArray = this.inscrptionArray.filter((i) => i.studentId == id);
      console.log(this.inscrptionArray);
      return this.getInscription();
    }

    createInscription(course: InscriptionModel) {
      this.loadingService.setIsLoading(true);
      this.inscrptionArray.push(course);
      return this.getInscriptionByCourse(course.courseId);
    }
  
    deleteInscription(id: number) {
      if(confirm('¿Esta seguro de Eliminar el Alumno?')){
        this.loadingService.setIsLoading(true);
        this.inscrptionArray = this.inscrptionArray.filter((user) => user.id !== id);
        return this.getInscription().pipe(
          tap(() =>
            this.alerts.showSuccess('Realizado', 'Se elimino correctamente')
          )
        );
      }
      return this.getInscription();
    }

}
