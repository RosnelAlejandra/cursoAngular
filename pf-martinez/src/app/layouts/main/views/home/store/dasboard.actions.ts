import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CareerModel, CourseModel } from '../../courses/models/course.model';

export const DasboardActions = createActionGroup({
  source: 'Dasboard',
  events: {
    /* Cursos */
    'Load Courses': emptyProps(),
    'Load Courses Success': props<{ data: CourseModel[] }>(),
    'Load Courses Failure': props<{ error: unknown }>(),
    /* Carrerar */
    'Load Careears': emptyProps(),
    'Load Careears Success': props<{ data: CareerModel[] }>(),
    'Load Careears Failure': props<{ error: unknown }>(),
  }
});
