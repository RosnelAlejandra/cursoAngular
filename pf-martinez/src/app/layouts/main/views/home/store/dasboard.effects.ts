import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { DasboardActions } from './dasboard.actions';
import { CourseService } from '../../../../../core/services/course.service';
import { CareerService } from '../../../../../core/services/career.service';


@Injectable()
export class DasboardEffects {

  loadDasboards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DasboardActions.loadDasboards), //se filtra las acciones ,[]) 
      concatMap(() =>
        this.courseService.getCources().pipe(
          map(data => DasboardActions.loadDasboardsSuccess({ data })),
          catchError(error => of(DasboardActions.loadDasboardsFailure({ error }))))
      )
    );
  });


  constructor(
    private actions$: Actions,
    private courseService: CourseService,
    private careerService: CareerService,
  ) {}
}
