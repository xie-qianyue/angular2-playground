import {Component,  OnInit} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';
import {HeroService} from './hero.service';
import {Hero} from './hero';

@Component({
  selector: 'my-hero-detail',
  template: `
            <div *ngIf="hero">
                <h2>Hello {{hero.name}}!</h2>
                <div><input [(ngModel)]='hero.name' placeholder='name'></div>
                <div><label>id: </label>{{hero.id}}</div>
            </div>
            <button (click)="gotoHeroes()">Back</button> 
            `,
  inputs: ['hero']
})

export class HeroDetailComponent implements OnInit {
  
  constructor(
    private _router:Router,
    private _routeParams:RouteParams,
    private _service:HeroService){ }
    
  ngOnInit() {
    let id = this._routeParams.get('id');
    this._service.getHero(id).then(hero => this.hero = hero);
  }
  
  gotoHeroes() {
    this._router.navigate(['HeroList']);
  }
  
  public hero: Hero;
}