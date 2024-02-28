import { createFeature, createReducer, on } from '@ngrx/store';
import { DasboardActions } from './dasboard.actions';
import { CareerModel, CourseModel } from '../../courses/models/course.model';

export const dasboardFeatureKey = 'dasboard';

export interface DashboardState {
  courses: CourseModel[] | null,
  careers: CareerModel[] | null,
  loading: boolean,
  error: unknown
}

export const initialState: DashboardState = {
  courses: [],
  careers: [],
  loading: false,
  error: null
};

export const reducer = createReducer(
  initialState,
  on(DasboardActions.loadDasboards, state => {return {
    ...state,
    loading: true,
  }}),
  on(DasboardActions.loadDasboardsSuccess, (state, action) => {
      return {
      ...state,
      courses: action.data,
      loading: false,
  }}),
  on(DasboardActions.loadDasboardsFailure, (state, action) => {
      return {
      ...state,
      loading: false,
      error: action.error
  }}),
);

export const dasboardFeature = createFeature({
  name: dasboardFeatureKey,
  reducer,
});

