import { createSelector } from "@ngrx/store";
import { IHeroState } from "../state/hero.state";
import { IAppState } from "../state/app.state";

const selectHero = (state: IAppState) => state.heroes;

export const selectHeroList = createSelector(
    selectHero,
    (state: IHeroState) => state.heroes
)
