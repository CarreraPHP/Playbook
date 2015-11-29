import {
	Component, Input,
	OnInit, OnDestroy, OnChanges, SimpleChange
} from 'angular2/angular2';
import {Card} from '../card/Card';
import {ChartService} from '../../services/ChartService';

@Component({
	selector: 'pb-viewport',
	templateUrl: 'app/components/viewport/Viewport.html',
	directives: [Card],
	providers: [ChartService]
})

export class Viewport implements OnInit, OnDestroy, OnChanges {
	@Input('pb-name') name: string;
	
	constructor(chartService:ChartService) {
		console.log("This is a log generated with viewport...");
	 }

	onInit() { }
	
	onChanges(changes: {[key:string]:SimpleChange}) {
		
	 }
	
	onDestroy() { }
}