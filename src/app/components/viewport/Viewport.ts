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
	@Input('pb-name') name: string;
	public items: CardService[];

	private _showAdmin = false;
	private _showView = true; // Display Preview
	
	constructor(private chartService: ChartService) {
		// debugger;
		// chartService.add();
		this.items = chartService.getAll();
		// console.log("This is a log generated with viewport...", this.items);
	}

	ngOnInit() {
		// console.log("viewport : initialised");
	}

	ngOnChanges(changes: { [key: string]: SimpleChange }) {

	}

	ngOnDestroy() { }
	
	/**
	 * used for determining whether to enable admin view or display view
	 */
	@Input('is-admin') set isAdmin(value: boolean) {
		console.log("Admin value is ", value);
		this._showAdmin = value;
		this._showView = !value;
	}

	onCardBoundedRectAvailable($event: any) {
		let refLeft = ($event.item.internal.left) + $event.rect.width + ChartService.CARD_GAP;
		let refTop = ($event.item.internal.top) + $event.rect.height + ChartService.CARD_GAP;
		// let refLeft = ($event.item.internal.left > $event.rect.left ? $event.item.internal.left : $event.rect.left) + $event.rect.width + Viewport.CARD_GAP;
		
		this.items.forEach((item: CardService, ik) => {
			if ($event.item.id == item.internal.linkLeft) {
				item.internal.left = refLeft;
			} else if ("start" === item.internal.linkLeft) {
				item.internal.left = 0;
			}
			if ($event.item.id === item.internal.linkTop) {
				item.internal.top = refTop;
			} else if ("start" === item.internal.linkTop) {
				item.internal.top = 0;
			}
			// console.log("viewport listening", refLeft, refTop, item.id, item.internal);
		});
	}
	
	onCardAction($event) {
		console.log("card action", $event);
		if($event.event === "add") {
			let rowStart:string = this.chartService.getRowStartCard($event.item),
				card = this.chartService.generateCard("", "card description", rowStart, this.chartService.getColumnStartCard($event.item, rowStart)),
				opt = this.chartService.generateOption(card.id); // , "option name"
				
			card.internal.left = this.chartService.getCord(card.internal, "left");
			card.internal.top = this.chartService.getCord(card.internal, "top");
			this.chartService.items.push(card);
			$event.item.options.push(opt);	
		} 
	}
}