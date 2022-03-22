import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { IAppState } from '../store/state/app.state';
import { select, Store } from '@ngrx/store';
import { selectHeroList } from '../store/selectors/hero.selectors';
import { map, tap } from 'rxjs';
import { UpdateHero } from '../store/actions/hero.actions';
import { MessageService } from '../message.service';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.sass']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero!: Hero

  constructor(private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private store: Store<IAppState>,
    private messageService: MessageService) { }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  ngOnInit(): void {
    this.getHero();
  }
  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.store.pipe(
      select(selectHeroList),
      map((heroes) => { return heroes.filter((hero) => hero.id === id) }),
      tap(_ => this.log(`fetched hero id=${id}`)))
      .subscribe(selectedHero => {
        this.hero = JSON.parse(JSON.stringify(selectedHero[0]));
        this.goToErrorPage(this.hero);
      });
  }
  goBack(): void {
    this.location.back();
  }
  goToErrorPage(hero: Hero | undefined): void {
    if (!hero) {
      this.router.navigate(["/error"]);
    }
  }
  save(): void {
    this.store.dispatch(new UpdateHero(this.hero));
    this.goBack();
  }
}
