import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { DasboardActions } from './dasboard.actions';
import { CourseService } from '../../../../../core/services/course.service';
import { CareerService } from '../../../../../core/services/career.service';


@Injectable()
export class DasboardEffects {

  loadCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DasboardActions.loadCourses), //se filtra las acciones ,[]) 
      concatMap(() =>
        this.courseService.getCources().pipe(
          map(data => DasboardActions.loadCoursesSuccess({ data })),
          catchError(error => of(DasboardActions.loadCoursesFailure({ error }))))
      )
    );
  });

  loadCareears$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DasboardActions.loadCareears), //se filtra las acciones ,[]) 
      concatMap(() =>
        this.careerService.getCareers().pipe(
          map(data => DasboardActions.loadCareearsSuccess({ data })),
          catchError(error => of(DasboardActions.loadCareearsFailure({ error }))))
      )
    );
  });


  constructor(
    private actions$: Actions,
    private courseService: CourseService,
    private careerService: CareerService,
  ) {}
}
