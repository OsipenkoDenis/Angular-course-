import { createSelector } from "@ngrx/store";

import { IAppState } from "../state/app.state";
import { IHeroState } from "../state/hero.state";

const selectHero = (state: IAppState) => state.heroes;

export const selectHeroList = createSelector(
 selectHero,
 (state: IHeroState) =>state.heroes   
)

const selectHeroId = (state:IAppState) => state.heroes;

export const selectIdDeletedHero = createSelector(
selectHeroId,
(state: IHeroState) => state.idDeletedHero
)