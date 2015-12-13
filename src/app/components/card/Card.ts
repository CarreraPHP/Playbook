import {
Component, Input, Output, HostListener, EventEmitter,
CORE_DIRECTIVES,
OnInit, AfterViewInit, AfterContentInit, AfterViewChecked, AfterContentChecked, ElementRef,
OnChanges, SimpleChange
} from 'angular2/angular2';
import { ChartService } from '../../services/ChartService';
import { CardService } from '../../services/CardService';
import { InternalService } from '../../services/InternalService';
import { ActorService } from '../../services/ActorService';
import { OptionService } from '../../services/OptionService';

@Component({
	selector: 'pb-card',
	templateUrl: 'app/components/card/Card.html',
	styles: [`
		.card-overlay{
			position:absolute;
			background: rgba(0, 0, 0, 0.6);
			height:100%;
			width:100%;
		}
		.card-button-list{
			padding: 0 0 0 20px;
		}
		.card-button{
			width:36px;
			height:36px;
			border-radius:50%;
			background:rgba(255, 255, 255, 0.5);
			padding:5px;
			margin:5px;
		}
		.card-button:hover{
			background:rgba(255, 255, 255, 0.9);
		}
		.card-overlay button i {
			font: normal normal normal 25px/25px FontAwesome;
			margin:0;padding:0;
		}
	`],
	directives: [CORE_DIRECTIVES]
})

export class Card implements OnInit, AfterViewInit, AfterContentInit {
	@Input('card-item') item: CardService;
	@Input('show-edtior')  showEditor:boolean; // determines whether editor should be shown or not.
	@Output('rectAvailable') boundedRect: EventEmitter<any> = new EventEmitter();
	@Output('cardAction') cardRefresh: EventEmitter<any> = new EventEmitter();
	
	private _internal:InternalService;
	private enableEditor: boolean = false; // flag for when to editor screen

	constructor(private elRef: ElementRef, private chartService:ChartService) {

	}

	ngOnInit() {
		// console.log("within card item, ", this.item);
	}

	ngOnChanges(changes: { [key: string]: SimpleChange }) {
		// console.log("data assigned : ", changes);
		this._internal = changes['item'].currentValue.internal;
	}

	ngAfterViewInit() {
		// console.log("View Init : ", this.elRef.nativeElement, arguments);
		this.emitBoundedRect();
	}

	ngAfterContentInit() {
		// console.log("Content Init : ", this.elRef.nativeElement, arguments);
		// this.emitBoundedRect();
	}
	
	ngAfterViewChecked() {
		// console.log(this.item.name, this.item.internal.left, this._internal.left);
		// this.emitBoundedRect();
	}

	ngAfterContentChecked() {
		// this.emitBoundedRect();
	}
	
	emitBoundedRect() {
		let el = this.elRef.nativeElement,
			elRect = el.getBoundingClientRect();
		console.log("Emit Bounded Recr : ", elRect.height, elRect.left, elRect.top);
		
		this.item.internal.width = elRect.width;
		this.item.internal.height = elRect.height;
		
		this.boundedRect.emit({
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
	
	emitCardRefresh(type?:string, item?:any) {
		this.cardRefresh.emit({
			event: type,
			item: item
		});
	}
	
	get editorWidth() : number {
		return this.item.internal.width;
	}
	
	get editorHeight() : number {
		return this.item.internal.height;
	}

	highlightRelation(cardCmp, enableAction) {

	}
	
	addOption() {
		
		let rowStart:string = this.chartService.getRowStartCard(this.item),
			card = this.chartService.generateCard("", "card description", rowStart, this.chartService.getColumnStartCard(this.item, rowStart)),
			opt = this.chartService.generateOption(card.id); // , "option name"
		this.emitCardRefresh("addcard", card);
		// this.chartService.items.push(card);
		this.item.options.push(opt);
	}

	@HostListener('click', ['$event']) OnHostClick(event) {
		// console.log("tiggered when click is made", arguments);
	}
	
	@HostListener('mouseenter', ['$event']) OnHostOver(event) {
		this.enableEditor = true;
		console.log("tiggered when mouse enters card", arguments);
	}
	
	@HostListener('mouseleave', ['$event']) OnHostLeava(event) {
		this.enableEditor = false;
		console.log("tiggered when mouse leaves card", arguments);
	}
}