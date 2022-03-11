import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { DeleteHero} from './store/actions/hero.actions';
import { IHeroState } from './store/state/hero.state';
import { Store } from '@ngrx/store';
import { HeroService } from './hero.service';
import { HeroActions } from './store/actions/hero.actions';
import { GetHeroes } from './store/actions/hero.actions';
import { map } from 'rxjs';


@Injectable()
export class AppEffects {
  heroes$ = this._heroService.getHeroes();
  // idx$ = 
  // state$ = {}
@Effect()
GetHeroes$ = this._action$.pipe(
  ofType<DeleteHero>(HeroActions.DeleteHero),
  map(action => new GetHeroes()),


)

constructor(private _action$: Action,
            private _store: Store<IHeroState>,
            private _heroService: HeroService){}
}
