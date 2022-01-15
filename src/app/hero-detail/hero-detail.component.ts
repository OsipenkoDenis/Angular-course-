import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
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
    private router: Router) { }

  ngOnInit(): void {
    this.getHero();
  }
  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => {
        this.hero = hero;
        this.goToErrorPage(hero);
        });
  }
  goBack(): void {
    this.location.back();
  }
  goToErrorPage(hero: any):void{
    if(!hero){
      this.router.navigate(["/error"]);
    }
  }
}
