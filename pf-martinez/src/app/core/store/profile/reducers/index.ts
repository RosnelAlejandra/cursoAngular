import { createReducer, on } from "@ngrx/store";
import { actionsProfile } from "../actions";

export const featureNameProfile = 'profile'

export interface ProfileState{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

/* estado inicial de la información */
const inicialProfileState: ProfileState = {
    id: 0,
    firstName:  '',
    lastName:  '',
    email:  '',
    role:  '',
}

export const profileReducer = createReducer<ProfileState | null>(
    inicialProfileState,
    on(actionsProfile.clean, (state) => {
        return {
            ...inicialProfileState
        }
    }),
    on(actionsProfile.setProfile, (state, action) => {
        return {
            ...state,
            ...action
        }
    })
)