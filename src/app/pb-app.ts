import {Component} from 'angular2/core';
import {Viewport} from './components/viewport/Viewport'

@Component({
    selector: 'pb-app',
    templateUrl: 'app/pb-app.html',
    directives: [Viewport]
})
export class PlaybookApp { }