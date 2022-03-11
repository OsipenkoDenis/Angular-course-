import { ActionReducerMap } from "@ngrx/store";
import { IAppState } from "../state/app.state";
import { heroReducer } from "./dashboard.reducers";
export const appReducers: ActionReducerMap<IAppState, any> = {
    heroes: heroReducer,
}