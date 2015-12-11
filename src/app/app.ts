import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/angular2';
// import {bootstrap} from 'angular2/bootstrap'; // version > 47 should have bootstrap barrel reference.

import {Viewport} from './components/viewport/Viewport'
import {ChartService} from './services/ChartService';

@Component({
    selector: 'pb-app',
    templateUrl: 'app/app.html',
    directives: [Viewport]
})
class AppComponent { }
bootstrap(AppComponent, [ChartService]);