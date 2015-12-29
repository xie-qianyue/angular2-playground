// Angular is also modular. It is a collection of library modules. 
// Each library is itself a module made up of several, related feature modules.
import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {HeroComponent} from './hero/hero.component';
import {TodoComponent} from './todo/todo.component';

// We define a component's metadata with the Angular Component function.
@Component({
    selector: 'ng2-plg',
    template: `
        <h1>Angular 2 Playground</h1>
        <a [routerLink]="['Todo']">Todo</a>
        <a [routerLink]="['Hero']">Hero</a>
        <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
  {path:'/hero/...', name: 'Hero', component: HeroComponent},
  {path:'/todo/', name: 'Todo', component: TodoComponent, useAsDefault: true}
])

// The name of the file (without extension) is usually the name of the module. 
// Accordingly, 'app.component' is the name of our first module.
export class AppComponent { }