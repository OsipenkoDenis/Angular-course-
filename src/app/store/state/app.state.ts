import { Hero } from "src/app/hero";
import { IHeroState, initialHeroState } from "./hero.state";

export interface IAppState {
    heroes: IHeroState
}
export const initialAppState: IAppState = {
    heroes: initialHeroState
}
 export function getInitialState(): IAppState {
     return initialAppState
 }
