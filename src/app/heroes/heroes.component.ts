import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { IAppState } from '../store/state/app.state';
import { selectHeroList } from '../store/selectors/hero.selectors';
import { AddHero, GetHeroes, DeleteHero } from '../store/actions/hero.actions';
import { selectIdDeletedHero } from '../store/selectors/hero.selectors';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes$: Hero[] = [];
  heroes = this.store.pipe(select(selectHeroList))
  idDeletedHero$:number = 0;
  idDeletedHero = this.store.pipe(select(selectIdDeletedHero))
  constructor(private store: Store<IAppState>) { }

  ngOnInit(): void {
    // this.getHeroes();
    this.store.dispatch(new GetHeroes());
  }

  // getHeroes(): void {
  //   this.heroService.getHeroes()
  //   .subscribe(heroes => this.heroes = heroes);
  // }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.store.dispatch(new AddHero({name} as Hero))
      // .subscribe(hero => {
      //   this.heroes.push(hero);
      // });
  }

  delete(hero: Hero): void {
    // this.heroes = this.heroes.pipe(filter(h => h !== hero));
    this.store.dispatch(new DeleteHero(hero.id));
  }

}