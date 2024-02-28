import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProfileState, featureNameProfile } from "../reducers";

/* Atajo o manera de aceder al store de forma rapida  */
export const selectProfileState = createFeatureSelector<ProfileState | null>(featureNameProfile);

export const selectNameProfile = createSelector(selectProfileState, 
                (state) => state?.firstName + " " + state?.lastName);

export const selectRolProfile = createSelector(selectProfileState, (state) => state?.role ?? '');

export const selectProfile = createSelector(selectProfileState, (state) => state);                