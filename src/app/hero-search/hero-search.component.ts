import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { select } from '@ngrx/store';
import {
  debounceTime, distinctUntilChanged, mergeMap, map, tap
} from 'rxjs/operators';
import { Hero } from '../hero';
import { IAppState } from '../store/state/app.state';
import { selectHeroList } from '../store/selectors/hero.selectors';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.sass']
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private store: Store<IAppState>,
    private messageService: MessageService) { }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      mergeMap((term: string) => this.searchHeroes(term)));
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.store.pipe(
      select(selectHeroList),
      map((heroes) => { return heroes.filter((hero) => hero.name.includes(term)) }),
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)));
  }
}