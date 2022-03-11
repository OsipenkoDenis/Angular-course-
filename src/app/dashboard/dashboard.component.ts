import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { Store, select } from '@ngrx/store';
import { GetHeroes } from '../store/actions/hero.actions'; 
import { IAppState } from '../store/state/app.state';
import { selectHeroList } from '../store/selectors/hero.selectors';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  heroes$: Hero[] = [];
  heroes = this.store.pipe(select(selectHeroList))
  constructor(private store: Store<IAppState>,
    ) { }

  ngOnInit(): void {
    this.store.dispatch(new GetHeroes());
    console.log(this.heroes);
  }
}
