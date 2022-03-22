import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AddHero, DeleteHero, GetHeroes, SetHeroes, UpdateHero} from './store/actions/hero.actions';
import { HeroService } from './hero.service';
import { HeroActions} from './store/actions/hero.actions';
import { map, switchMap } from 'rxjs';


@Injectable()
export class AppEffects {
  GetHeroes$ = createEffect(()=>{
   return this._action$.pipe(
    ofType<GetHeroes>(HeroActions.GetHeroes),
    switchMap(()=> this._heroService.getHeroes()
    .pipe(switchMap(async (heroes) => {
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

AddHero$ = createEffect(() => {
  return this._action$.pipe(
  ofType<AddHero>(HeroActions.AddHero),
  switchMap(action => this._heroService.addHero(action.payload)
  .pipe(switchMap(async () => {
    return new GetHeroes()
  }))))
})

UpdateHero$ = createEffect(() => {
  return this._action$.pipe(
    ofType<UpdateHero>(HeroActions.UpdateHero),
    switchMap(action => this._heroService.updateHero(action.payload)
    .pipe(switchMap(async () =>{
      return new GetHeroes()
    }))))}
)

constructor(private _action$: Actions,
            private _heroService: HeroService){}
}
