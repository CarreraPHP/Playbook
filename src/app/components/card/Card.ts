import {
	Component, Input, HostListener,
	CORE_DIRECTIVES,
	OnInit,
	OnChanges, SimpleChange
} from 'angular2/angular2';
import {CardService} from '../../services/CardService';
import { InternalService } from '../../services/InternalService';
import { ActorService } from '../../services/ActorService';
import { OptionService } from '../../services/OptionService';

@Component({
	selector: 'pb-card',
	templateUrl: 'app/components/card/Card.html',
	directives: [CORE_DIRECTIVES]
})

export class Card implements OnInit {
	@Input('card-item') item:CardService;
	
	constructor() {
		
	}

	ngOnInit() {
		console.log("within card item, ", this.item);
	}
	
	ngOnChanges(changes: {[key:string]:SimpleChange}) {
		console.log("data assigned : ", changes);	
	 }
	
	highlightRelation(cardCmp, enableAction) {
		
	}
	
	@HostListener('click', ['$event']) OnHostClick(event) {
		console.log("tiggered when click is made", arguments);
	}
}