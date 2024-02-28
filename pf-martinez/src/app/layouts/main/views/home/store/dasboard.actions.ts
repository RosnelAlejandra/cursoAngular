import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CourseModel } from '../../courses/models/course.model';

export const DasboardActions = createActionGroup({
  source: 'Dasboard',
  events: {
    'Load Dasboards': emptyProps(),
    'Load Dasboards Success': props<{ data: CourseModel[] }>(),
    'Load Dasboards Failure': props<{ error: unknown }>(),
  }
});
