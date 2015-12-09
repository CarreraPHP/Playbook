import {
	Component, Input,
	CORE_DIRECTIVES,
	OnInit, OnDestroy, OnChanges, SimpleChange	
} from 'angular2/angular2';
import { ListWrapper } from 'angular2/src/facade/collection';
import { Card } from '../card/Card';
import { ChartService } from '../../services/ChartService';
import { CardService } from '../../services/CardService';
import { OptionInterface } from '../../interfaces/OptionInterface'

@Component({
	selector: 'pb-viewport',
	templateUrl: 'app/components/viewport/Viewport.html',
	directives: [Card, CORE_DIRECTIVES],
	providers: [ChartService]
})

export class Viewport implements OnInit, OnDestroy, OnChanges {
	static CARD_GAP = 100;
	@Input('pb-name') name: string;
	public items:CardService[];
	
	constructor(private chartService:ChartService) {
		// debugger;
		// chartService.add();
		this.items = chartService.getAll();
		// console.log("This is a log generated with viewport...", this.items);
	 }

	ngOnInit() {
		// console.log("viewport : initialised");
	}
	
	ngOnChanges(changes: {[key:string]:SimpleChange}) {
		
	 }
	
	ngOnDestroy() { }
	
	onCardBoundedRectAvailable(prop:any, items:CardService[]) {		
		let refLeft = (prop.item.internal.left) + prop.rect.width + Viewport.CARD_GAP;
		let refTop = (prop.item.internal.left) + prop.rect.height + Viewport.CARD_GAP;
		// let refLeft = (prop.item.internal.left > prop.rect.left ? prop.item.internal.left : prop.rect.left) + prop.rect.width + Viewport.CARD_GAP;
		
		console.log("viewport listening", arguments);
		ListWrapper.forEachWithIndex(prop.item.options, function(opt:OptionInterface, k){
			// console.log("viewport listening", prop, this);
			
			// items referenced in the options should be placed to the right with the GAP.
			ListWrapper.forEachWithIndex(items, function(item:CardService, ik){
				if(item.name == opt.reference){
					item.internal.left = refLeft;
				}
			});
			
			for(var i = items.length-1; i >= 0; i--){
				
			}
		});
	}
}