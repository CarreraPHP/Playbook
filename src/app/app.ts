import {bootstrap, Component} from 'angular2/angular2';
import {Viewport} from './components/viewport/Viewport'
import {ChartService} from './services/ChartService';

@Component({
    selector: 'pb-app',
    templateUrl: 'app/app.html',
    directives: [Viewport]
})
class AppComponent { }
bootstrap(AppComponent, [ChartService]);