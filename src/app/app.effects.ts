import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DeleteHero, GetHeroes, SetHeroes} from './store/actions/hero.actions';
import { Store } from '@ngrx/store';
import { HeroService } from './hero.service';
import { HeroActions} from './store/actions/hero.actions';
import { map, switchMap } from 'rxjs';
import { IAppState } from './store/state/app.state';


@Injectable()
export class AppEffects {
  GetHeroes$ = createEffect(()=>{
   return this._action$.pipe(
    ofType<GetHeroes>(HeroActions.GetHeroes),
    switchMap(()=> this._heroService.getHeroes()
    .pipe(switchMap(async (heroes) => {
      console.log(heroes);
      return new SetHeroes(heroes);
    })))) 
  })

DeleteHeroes$ = createEffect(()=>{
return this._action$.pipe(
  ofType<DeleteHero>(HeroActions.DeleteHero),
  switchMap(action => this._heroService.deleteHero(action.payload)
  .pipe(map(() => new GetHeroes()))),
)
}) 

constructor(private _action$: Actions,
            private _store: Store<IAppState>,
            private _heroService: HeroService){}
}
