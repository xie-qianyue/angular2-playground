// We need two things to launch the application:
// Angular's browser bootstrap function
// The application root component 
import {bootstrap}    from 'angular2/platform/browser'
import {AppComponent} from './app.component'
import {ROUTER_PROVIDERS} from 'angular2/router';

bootstrap(AppComponent, [  
  ROUTER_PROVIDERS,
]);