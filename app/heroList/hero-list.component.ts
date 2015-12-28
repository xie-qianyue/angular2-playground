import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core';
import {Hero} from './../model/hero';
import {HeroService} from './../service/hero.service'
import {HeroDetailComponent} from './../heroDetail/hero-detail.component'

// The (*) prefix to ngFor indicates that the <li> element and its children constitute a master template.
// The # prefix before "hero" identifies the hero as a local template variable. 
// Our styles will only apply to our AppComponent and won't "leak" to the outer HTML.
// ngIf : to keep the hero detail out of the DOM until there is a selected hero.
@Component({
    selector: 'my-app',
    template: `            
            <h1>{{title}}</h1>
            <h2>My Heroes</h2>
            <ul class='heroes'>
                <li *ngFor='#hero of heroes' (click)="onSelect(hero)" [class.selected]="hero === selectedHero">
                    <span class="badge">{{hero.id}}</span> {{hero.name}}
                </li>
            </ul>
            <my-hero-detail [hero]="selectedHero"></my-hero-detail>
              `,
    styles:[`
    .heroes {list-style-type: none; margin-left: 1em; padding: 0; width: 10em;}
    .heroes li { cursor: pointer; position: relative; left: 0; transition: all 0.2s ease; }
    .heroes li:hover {color: #369; background-color: #EEE; left: .2em;}
    .heroes .badge {
        font-size: small;
        color: white;
        padding: 0.1em 0.7em;
        background-color: #369;
        line-height: 1em;
        position: relative;
        left: -1px;
        top: -1px;
    }
    .selected { background-color: #EEE; color: #369; }
    `],
    directives: [HeroDetailComponent],
    providers: [HeroService]
})

export class HeroListComponent implements OnInit { 
    
    constructor(private _heroService: HeroService) { }
    
    ngOnInit(){
        this.getHeroes();
    }
    
    public title = 'Tour of Heros';
    public heroes: Hero[];
    public selectedHero: Hero;
    
    onSelect(hero: Hero) { this.selectedHero = hero; }
    
    getHeroes() {
        this._heroService.getHeroes().then(
            heroes => this.heroes = heroes
        );
    }
}