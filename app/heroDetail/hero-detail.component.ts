import {Component} from 'angular2/core';
import {Hero} from './model/hero';

@Component({
  selector: 'my-hero-detail',
  template: `
            <div *ngIf="hero">
                Hello {{hero.name}}!
                <div><input [(ngModel)]='hero.name' placeholder='name'></div>
                <div><label>id: </label>{{hero.id}}</div>
            </div> 
            `,
  inputs: ['hero']
})

export class HeroDetailComponent {
  // hero is passed by app.component with [hero]="selectedHero"
  public hero: Hero;
}