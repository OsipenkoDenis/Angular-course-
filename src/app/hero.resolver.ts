import { Injectable} from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable} from "rxjs";
import { Hero } from './hero';
import { HeroService } from "./hero.service";

@Injectable({providedIn:"root"})

export class HeroResolver implements Resolve<Hero[]>{
    constructor(private heroService: HeroService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Hero[] | Observable<Hero[]> | Promise<Hero[]> {
        return this.heroService.getHeroes()
    }
}
