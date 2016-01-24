import {
Component, Input, Output, HostListener, EventEmitter, HostBinding,
OnInit, AfterViewInit, AfterContentInit, AfterViewChecked, AfterContentChecked, ElementRef,
OnChanges, SimpleChange, ChangeDetectionStrategy, ChangeDetectorRef
} from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { ChartService } from '../../services/ChartService';
import { CardService } from '../../services/CardService';
import { InternalService } from '../../services/InternalService';
import { ActorService } from '../../services/ActorService';
import { OptionService } from '../../services/OptionService';

// changeDetection: ChangeDetectionStrategy.OnPush,

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
	// @Input('card-internal') itemInternal: InternalService; //needed only for tracking changes.
	@Input('show-edtior')  showEditor:boolean; // determines whether editor should be shown or not.
	@Output('rectAvailable') boundedRect: EventEmitter<any> = new EventEmitter();
	@Output('cardAction') cardRefresh: EventEmitter<any> = new EventEmitter();
	// @HostBinding('style.left.px') cleft:number;
	
	private _internal:InternalService;
	private enableEditor: boolean = false; // flag for when to editor screen

	constructor(private elRef: ElementRef, private chartService:ChartService, private changeDetector:ChangeDetectorRef) {

	}

	ngOnInit() {
		// console.log("within card item, ", this.item);
	}

	ngOnChanges(changes: { [key: string]: SimpleChange }) {
		console.log("%cdata assigned : ", "color:green;font-size:18px", changes);
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
	
	/**
	 * Card below to the current adjusts itself when option is added. 
	 * Need to cascade the same to all items in the column.
	 */
	ngAfterViewChecked() {
		// console.log(this.item.name, this.item.internal.left, this._internal.left);
		let el = this.elRef.nativeElement,
			elRect = el.getBoundingClientRect();
		if(this.item.internal.height !== elRect.height){
			this.emitBoundedRect();	
		}
	}

	ngAfterContentChecked() {
		// this.emitBoundedRect();
	}
	
	emitBoundedRect() {
		let el = this.elRef.nativeElement,
			elRect = el.getBoundingClientRect();
            
        // console.group("Before Emit in Card : ")            
		// console.log("Emit Bounded Recr : ", elRect.height, elRect.left, elRect.top);
        // console.groupEnd();
        
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
	
	/**
	 * When a option is added a card is added mandatorily.
	 * This makes the "add" cardrefresh event to be triggered. 
	 * This also mandates that we rearrange the card below the current card. 
	 */
	addOption() {
		this.emitCardRefresh("add", this.item);
        // this.changeDetector.markForCheck();
	}
    
    // @HostBinding('style.left') get left() {
    //     console.log("%cdata assigned : ", "color:red;font-size:18px", arguments);
    //     // this.emitBoundedRect();
    //     return this.item.internal.left; 
    // }

	@HostListener('click', ['$event']) OnHostClick(event) {
		// console.log("tiggered when click is made", arguments);
	}
	
	@HostListener('mouseenter', ['$event']) OnHostOver(event) {
		this.enableEditor = true;
		// console.log("tiggered when mouse enters card", arguments);
	}
	
	@HostListener('mouseleave', ['$event']) OnHostLeava(event) {
		this.enableEditor = false;
		// console.log("tiggered when mouse leaves card", arguments);
	}
}