import {
Component, Input, Output, HostListener, EventEmitter,
CORE_DIRECTIVES,
OnInit, AfterViewInit, AfterContentInit, AfterViewChecked, AfterContentChecked, ElementRef,
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

export class Card implements OnInit, AfterViewInit, AfterContentInit {
	@Input('card-item') item: CardService;
	@Output('rectAvailable') BoundedRect: EventEmitter<any> = new EventEmitter();
	
	private _internal:InternalService;

	constructor(private elRef: ElementRef) {

	}

	ngOnInit() {
		// console.log("within card item, ", this.item);
	}

	ngOnChanges(changes: { [key: string]: SimpleChange }) {
		console.log("data assigned : ", changes);
		this._internal = changes['item'].currentValue.internal;
	}

	ngAfterViewInit() {
		this.emitBoundedRect();
	}

	ngAfterContentInit() {
		// console.log("Content Init : ", this.elRef.nativeElement, arguments);
		// this.emitBoundedRect();
	}
	
	ngAfterViewChecked() {
		console.log(this.item.name, this.item.internal.left, this._internal.left);
		// this.emitBoundedRect();
	}

	ngAfterContentChecked() {
		// this.emitBoundedRect();
	}
	
	emitBoundedRect() {
		let el = this.elRef.nativeElement,
			elRect = el.getBoundingClientRect();
		// console.log("View Init : ", elRect.height, elRect.left, elRect.top);
		this.BoundedRect.emit({
			event: 'init',
			rect: {
				height: elRect.height,
				width: elRect.width,
				left: elRect.left,
				top: elRect.top
			},
			item: this.item,
			el: el
		});
	}

	highlightRelation(cardCmp, enableAction) {

	}

	@HostListener('click', ['$event']) OnHostClick(event) {
		// console.log("tiggered when click is made", arguments);
	}
}