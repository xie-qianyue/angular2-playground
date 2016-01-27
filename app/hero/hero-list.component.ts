import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {HeroService} from './hero.service';
import {Hero} from './hero';

// The (*) prefix to ngFor indicates that the <li> element and its children constitute a master template.
// The # prefix before "hero" identifies the hero as a local template variable. 
// Our styles will only apply to our AppComponent and won't "leak" to the outer HTML.
// ngIf : to keep the hero detail out of the DOM until there is a selected hero.
@Component({
    template: `            
            <h3>Hero list</h3>
            <ul class='heroes'>
                <li *ngFor='#hero of heroes' (click)="onSelect(hero)" [class.selected]="isSelected(hero)">
                    <span class="badge">{{hero.id}}</span> {{hero.name}}
                </li>
            </ul>
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
    `]
})

export class HeroListComponent implements OnInit {
    
    public heroes: Hero[];
    private _selectedId: number;

    constructor(
        private _router: Router,
        private _heroService: HeroService,
        private _routeParams: RouteParams
    ) {
        this._selectedId = +_routeParams.get('id');
    }
    
    ngOnInit(){
        this.getHeroes();
    }
    
    onSelect(hero: Hero) { 
        this._router.navigate( ['HeroDetail', { id: hero.id }] );    
    }
    
    getHeroes() {
        this._heroService.getHeroes().then(
            heroes => this.heroes = heroes
        );
    }

    isSelected(hero: Hero) {
        return this._selectedId === hero.id;
    }
}