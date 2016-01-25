import {
Component, Input, ElementRef, Query, QueryList,
OnInit, OnDestroy, OnChanges, SimpleChange, ChangeDetectorRef, ChangeDetectionStrategy
} from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';

import { Card } from '../card/Card';
import { Arrow } from '../arrow/Arrow';
import { ChartService } from '../../services/ChartService';
import { CardService } from '../../services/CardService';
import { OptionService } from '../../services/OptionService';
import { OptionInterface } from '../../interfaces/OptionInterface'

@Component({
	selector: 'pb-viewport',
	templateUrl: 'app/components/viewport/Viewport.html',
	directives: [Card, Arrow, CORE_DIRECTIVES],
    changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ChartService]
})

export class Viewport implements OnInit, OnDestroy, OnChanges {
	@Input('pb-name') name: string;
	public items: CardService[];

	private _showAdmin = false;
	private _showView = true; // Display Preview
	
	constructor(
        private elementRef:ElementRef, 
        private chartService: ChartService, 
        private changeDetector: ChangeDetectorRef) {
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
		// console.log("Admin value is ", value);
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
		});
        
	}
    
    onArrowInitialised($event: any) {
        console.log("%c" + $event.event, "color:red;font-size:42px;");
        if($event.event === "reference") {
            this.items.forEach((referredItem: CardService, ik) => {
                if ($event.option.reference == referredItem.id) {
                    $event.arrow.referencedItem = referredItem;
                }
            });
            console.log("%ccheck if this got executed", "color:red;font-size:42px;");
            return;
        }
        
        
        console.group("%cArrow", "color:red;font-size:22px;");            
            console.log("Option Node El : ", $event);
            console.log("Option Node El Rect : ", this.elementRef);
        console.groupEnd();
        
        
        // Handle the options array in here. There are 2 possible scenarios.
        // 1. Options within the item itself which we can handle outside too
        // 2. Options that reference the current item.
            
        let item:CardService = $event.item,
            vport = this.elementRef.nativeElement,
            el = vport.querySelector('#' + item.id),
            elRect = el.getBoundingClientRect();
            
        item.options.forEach((option: OptionService, ok) => {
            let optEl = el.querySelector('#' + option.id),
                optElRect = optEl.getBoundingClientRect(),
                topDiff:number = 0;
            
            // Steps to calculate the postion of the option :
            // 1. Get the difference between the card top and options top to get the position within the card.
            // 2. Add that with the (height/2 - 4px) of the option, so that the 8px base of the arrow will be in center.
            // 3. Left is same as the right-side end of the card, which is card's (left+width)
            
            option.internal.top = (optElRect.top - elRect.top) + (optElRect.height/2 -4);
            option.internal.left = elRect.left + elRect.width;
            option.internal.height = ChartService.CARD_GAP;
            option.internal.width = ChartService.CARD_GAP;
            
            console.group("%cArrow Dymistified", "color:red");
                console.group("%cCard", "color:blue");            
                    console.log("Option Node El : ", el);
                    console.log("Option Node El Rect : ", elRect);
                console.groupEnd();
                console.group("%cOption Node within the card", "color:green");            
                    console.log("Option Node El : ", optEl);
                    console.log("Option Node El Rect : ", optElRect);
                console.groupEnd();
                console.group("%cArrow", "color:Orange");            
                    // console.log("Option Node El : ", );
                    console.log("Option Node El Rect : ", option.internal);
                console.groupEnd();
            console.groupEnd();
            
            // 4. Decide whether the arrow should be normal, inverted or straight by using the top values of both item and reference.
            
            this.items.forEach((referredItem: CardService, ik) => {
                if (option.reference == referredItem.id) {
                    let refEl = vport.querySelector('#' + option.reference),
                        refElRect = refEl.getBoundingClientRect();
                        
                    option.internal.width = referredItem.internal.left - option.internal.left;
                    
                    if(referredItem.internal.top > option.internal.top) {
                        option.internal.height = referredItem.internal.top - option.internal.top - (referredItem.internal.height/2 - 1.5);
                    } else {
                        option.internal.height = option.internal.top - referredItem.internal.top + (referredItem.internal.height/2 - 1.5);
                    }
                    
                    topDiff = option.internal.top - (referredItem.internal.top + option.internal.height);
                    
                    console.group("Top Diff Value : ")            
                    console.log("Top Diff : ", topDiff);
                    console.log("Ref Rect : ", refEl, refElRect);
                    console.log("option internal : ", option.internal);
                    console.groupEnd();
                    
                    if((topDiff <= 8) && (topDiff >= -7)) {
                        option.internal.classes["arrow-reverse"] = false;
                        option.internal.classes["arrow-straight"] = true;
                        option.internal.classes["arrow"] = false;
                    } else if(topDiff < -7) {
                        option.internal.classes["arrow-reverse"] = true;
                        option.internal.classes["arrow-straight"] = false;
                        option.internal.classes["arrow"] = false;
                    } else {
                        option.internal.classes["arrow-reverse"] = false;
                        option.internal.classes["arrow-straight"] = false;
                        option.internal.classes["arrow"] = true;
                    }
                }
            });
            
            this.changeDetector.markForCheck();
            
            // console.group("Before handling Options in Viewport : ")            
            // console.log("Item Rect : ", elRect);
            // console.log("Option El Rect : ", optElRect);
            // console.log("Item : ", item);
            // console.log("Option : ", option);
            // console.groupEnd();
        });
    }
	
	/**
	 * When a card action for "add" is triggered. When start by get the start card of the previous column for linkLeft.
	 * Then we get the column start card for the current column, if there are already many cards placed in the same column
	 * then get the last on in order and use it to be linkTop.
	 * 
	 * Later we may need to trigger an action to rearrange the cards in the column of the card to which the option was originally added.
	 * This is need because we have increased the size of the card and therby reduced the space below it. this needs to fixed.
	 */
	onCardAction($event) {
		// console.log("card action", $event);
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