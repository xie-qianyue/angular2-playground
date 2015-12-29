import {Component} from 'angular2/core';
import {RouteConfig, RouterOutlet} from 'angular2/router';
import {HeroListComponent}     from './hero-list.component';
import {HeroDetailComponent} from './hero-detail.component';
import {HeroService} from './hero.service';

@Component({
  template:  `
    <h2>Heroes</h2>
    <router-outlet></router-outlet>
  `,
  directives: [RouterOutlet],
  providers:  [HeroService]
})

@RouteConfig([
  {path:'/',         name: 'Hero', component: HeroListComponent, useAsDefault: true},
  {path:'/:id',      name: 'HeroDetail', component: HeroDetailComponent},
  {path:'/list/:id', name: 'HeroList',   component: HeroListComponent}
])

export class HeroComponent { }