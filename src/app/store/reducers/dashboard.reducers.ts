import { initialHeroState } from "../state/hero.state";
import { HeroAction, HeroActions } from "../actions/hero.actions";
import { IHeroState } from "../state/hero.state";

export const heroReducer = (
    state = initialHeroState,
    action: HeroAction
): IHeroState => {
    switch (action.type){
        case HeroActions.GetHeroes: {
            return {
                ...state,
            };
        }
        case HeroActions.DeleteHero: {
            
            return {
                ...state,
                 idDeletedHero: action.payload
            };
        }
    
    default:
        return state;
}
}
