import { createReducer, on } from "@ngrx/store";
import { actionsAuth } from "../actions";

export const featureNameAuth = 'auth'

export interface AuthState{
    token: string,
    time: number,
}

/* estado inicial de la información */
const inicialState: AuthState = {
    token: '',
    time: 0,
}

export const authReducer = createReducer<AuthState>(
    inicialState,
    on(actionsAuth.clean, (state) => {
        return {
            ...inicialState
        }
    }),
    on(actionsAuth.setAuth, (state, action) => {
        return {
            ...state,
            ...action
        }
    })
)