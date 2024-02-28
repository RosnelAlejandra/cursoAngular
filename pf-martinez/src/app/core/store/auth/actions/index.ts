import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { AuthState } from "../reducers";

/* se crean las acciones, se defines nombre y propiedades */
export const actionsAuth = createActionGroup({
    source: "auth",
    events:{
        'clean': emptyProps(),
        'setAuth': props<AuthState>()
    }
})