import { Hero } from "src/app/hero";    
export interface IHeroState{
    heroes: Hero[]
}
export const initialHeroState: IHeroState = {
    heroes: []
};