import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { CareerService } from '../../../../core/services/career.service';
import { CareerModel, CourseModel } from '../courses/models/course.model';
import { DasboardActions } from './store/dasboard.actions';
import { selectDasboardState, selectLoadingState } from './store/dasboard.selectors';
import { DashboardState } from './store/dasboard.reducer';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnDestroy {

  dataCourse: CourseModel[] | null = null;
  dataCareear: CareerModel[] | null = null;
  isLoading$: Observable<boolean>;

  /* courseSubscription?: Subscription; */
  subscriptions: Subscription[] = [];

  constructor( private store: Store ){
    /* disparamos las acciones  */
   this.store.dispatch(DasboardActions.loadCourses());
   this.store.dispatch(DasboardActions.loadCareears());

   this.isLoading$ = this.store.select(selectLoadingState);

   /* Buscamos la data */
   this.subscriptions.push(
    this.store.select(selectDasboardState).subscribe({
      next: (state: DashboardState) => {
        this.dataCourse = state.courses
      }
     })
   )
   this.subscriptions.push(
    this.store.select(selectDasboardState).subscribe({
      next: (state: DashboardState) => {
        this.dataCareear = state.careers
      }
     })
   )

  /* suscripcion individual     
    this.courseSubscription = this.store.select(selectDasboardState).subscribe({
      next: (state: DashboardState) => {
        //console.log("ss");
        this.dataCourse = state.courses
      }
    }) 
    tambien se puede usar el pipe  .pipe(takeUntil(this.destroyed$))
  */

  }

  /* para quitar las suscriones  */
 ngOnDestroy(): void {
   //this.courseSubscription?.unsubscribe();
   this.subscriptions.forEach(s=>s.unsubscribe());
 }

 getModalityName(modalityId: number): string {
  const modalities = ['Presencial', 'Online'];
  return modalities[modalityId - 1];
}

getStatusText(status: number): string {
  return status === 1 ? 'Activo' : 'Inactivo';
}

}
