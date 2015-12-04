import {
	Component, Input,
	CORE_DIRECTIVES,
	OnInit, OnDestroy, OnChanges, SimpleChange
} from 'angular2/angular2';
import {Card} from '../card/Card';
import { ChartService } from '../../services/ChartService';
import {CardService} from '../../services/CardService';

@Component({
	selector: 'pb-viewport',
	templateUrl: 'app/components/viewport/Viewport.html',
	directives: [Card, CORE_DIRECTIVES],
	providers: [ChartService]
})

export class Viewport implements OnInit, OnDestroy, OnChanges {
	@Input('pb-name') name: string;
	public items:CardService[];
	
	constructor(private chartService:ChartService) {
		// debugger;
		// chartService.add();
		this.items = chartService.getAll();
		console.log("This is a log generated with viewport...", this.items);
	 }

	ngOnInit() {
		console.log("viewport : initialised");
	}
	
	ngOnChanges(changes: {[key:string]:SimpleChange}) {
		
	 }
	
	ngOnDestroy() { }
}