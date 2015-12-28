// Angular is also modular. It is a collection of library modules. 
// Each library is itself a module made up of several, related feature modules.
import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {HeroListComponent}     from './heroList/hero-list.component';

// We define a component's metadata with the Angular Component function.
@Component({
    selector: 'my-app',
    template: `
        <a [routerLink]="['Heroes']">Heroes</a>
        <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
  {path:'/heroes',        name: 'Heroes',       component: HeroListComponent}
])

// The name of the file (without extension) is usually the name of the module. 
// Accordingly, 'app.component' is the name of our first module.
export class AppComponent { }