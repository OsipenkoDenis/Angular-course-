import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HeroResolver } from './hero.resolver';
import { CustomRouteReuseStrategy } from './custom-route-reuse-strategy.service';

const routes: Routes = [
  {path:"heroes", component:HeroesComponent,
   resolve: {heroes:HeroResolver}},
  {path:"dashboard", component: DashboardComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path:"detail/:id", component: HeroDetailComponent},
  {path:"error", component:ErrorPageComponent},
  {path:"**", redirectTo:"/error"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[{
    provide:RouteReuseStrategy,
    useClass: CustomRouteReuseStrategy,
    }],
})
export class AppRoutingModule { }
