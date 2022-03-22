import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Hero } from '../hero';
import { IAppState } from '../store/state/app.state';
import { selectHeroList } from '../store/selectors/hero.selectors';
import { AddHero, GetHeroes, DeleteHero } from '../store/actions/hero.actions';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.sass']
})
export class HeroesComponent implements OnInit {
  heroes$: Hero[] = [];
  heroes = this.store.pipe(select(selectHeroList))
  constructor(private store: Store<IAppState>) { }

  ngOnInit(): void {
    this.store.dispatch(new GetHeroes());
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.store.dispatch(new AddHero({ name } as Hero));
  }

  delete(hero: Hero): void {
    this.store.dispatch(new DeleteHero(hero.id));
  }

}