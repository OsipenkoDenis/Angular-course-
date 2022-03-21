import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { IAppState } from '../store/state/app.state';
import { select, Store } from '@ngrx/store';
import { selectHeroList } from '../store/selectors/hero.selectors';
import { filter, map } from 'rxjs';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.sass']
})
export class HeroDetailComponent implements OnInit {
 @Input() hero?: Hero


  constructor(private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private router: Router,
    private store: Store<IAppState>) { }

  ngOnInit(): void {
    this.getHero();
  }
  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const selectedHero = this.store.pipe(select(selectHeroList),map((heroes) => {heroes[id]}))
    .subscribe(selHero => {this.hero = selHero,
    this.goToErrorPage(selHero)})
    // .subscribe(this.hero = selectedHero;
    //   this.goToErrorPage(selectedHero););
    // const selselectedHero = heroes.pipe(filter((hero) => return {hero.id === id}))
    // this.hero = selectedHero;
    // this.goToErrorPage(selectedHero);
    // map((heroes) => {return heroes[id]}
    //   this.hero = heroes[id];
    //   this.goToErrorPage(heroes[id]);
    // );
    // this.heroService.getHero(id)
    //   .subscribe(hero => {
    //     this.hero = hero;
    //     this.goToErrorPage(hero);
    //     });
  }
  goBack(): void {
    this.location.back();
  }
  goToErrorPage(hero: any):void{
    if(!hero){
      this.router.navigate(["/error"]);
    }
  }
  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }
}
