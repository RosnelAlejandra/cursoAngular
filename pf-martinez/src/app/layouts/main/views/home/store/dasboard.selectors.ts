import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromDasboard from './dasboard.reducer';

export const selectDasboardState = createFeatureSelector<fromDasboard.DashboardState>(
  fromDasboard.dasboardFeatureKey
);

export const selectCoursesState = createSelector(
  selectDasboardState,
  state => state.courses
);

export const selectCareearState = createSelector(
  selectDasboardState,
  state => state.careers
);

export const selectLoadingState = createSelector(
  selectDasboardState,
  state => state.loading
);