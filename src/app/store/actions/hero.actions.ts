import { Action, createAction } from "@ngrx/store";
import { Hero } from "src/app/hero";

export enum HeroActions {
    AddHero = '[angular-tour-of-heroes] Add Hero',
    DeleteHero = '[angular-tour-of-heroes] Delete Hero',
    GetHeroes = '[angular-tour-of-heroes] Get Heroes'
}

export class AddHero implements Action {
    public readonly type = HeroActions.AddHero;
    constructor(public payload: Hero){}
}

export class DeleteHero implements Action {
    public readonly type = HeroActions.DeleteHero;
    constructor(public payload: Hero["id"]){}
}

export class GetHeroes implements Action {
    public readonly type = HeroActions.GetHeroes;
}

export type HeroAction= AddHero | DeleteHero | GetHeroes;