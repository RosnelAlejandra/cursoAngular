import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState, featureNameAuth } from "../reducers";

/* Atajo o manera de aceder al store de forma rapida  */
export const selectAuthState = createFeatureSelector<AuthState>(featureNameAuth);

export const selectToken = createSelector(selectAuthState, 
    (state) => state.token);                

export const selectTimeAuth = createSelector(selectAuthState, 
    (state) => state.time); 