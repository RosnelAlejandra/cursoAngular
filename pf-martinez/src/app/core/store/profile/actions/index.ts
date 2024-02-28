import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ProfileState } from "../reducers";
/* se crean las acciones, se defines nombre y propiedades */
export const actionsProfile = createActionGroup({
    source: "profile",
    events:{
        'clean': emptyProps(),
        'setProfile': props<ProfileState>()
    }
})