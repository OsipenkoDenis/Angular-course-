import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Hero } from '../hero';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.sass']
})
export class HeroesComponent implements OnInit {
heroes:Hero[] = [];
constructor(private route: ActivatedRoute){}

   getHeroes(): void{
    this.route.data.subscribe(data =>{
      this.heroes = data['heroes'];
    })
   }

  ngOnInit(): void {
    this.getHeroes();
  }
}
