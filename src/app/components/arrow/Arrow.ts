import {
    Component, Input, Output, EventEmitter, 
    ElementRef, ChangeDetectorRef,
    OnInit, AfterViewInit, AfterContentInit 
} from 'angular2/core';
import { ChartService } from '../../services/ChartService';
import { CardService } from '../../services/CardService';
import { OptionService } from '../../services/OptionService';

@Component({
    selector: 'pb-arrow',
    templateUrl: 'app/components/arrow/Arrow.html',
})

export class Arrow implements OnInit, AfterViewInit, AfterContentInit {
    @Input('card-item') item: CardService;
    @Input('arrow-item') option: OptionService;
    @Output('arrowInitialised') boundedRect: EventEmitter<any> = new EventEmitter();
    
    constructor(private elRef: ElementRef, private chartService:ChartService, private changeDetector:ChangeDetectorRef) {
        
     }

    ngOnInit() { }
    
    ngAfterContentInit() { }
    
    ngAfterViewInit() { 
        // console.log("Items in Arrow Class : ", this.item, this.option);
        this.emitBoundedRect();
    }
    
	emitBoundedRect() {
		let el = this.elRef.nativeElement;
		
		this.option.internal.width = ChartService.CARD_GAP;
		this.option.internal.height = ChartService.CARD_GAP;
		
		this.boundedRect.emit({
			event: 'init',
            option: this.option,
			item: this.item,
			el: el
		});
	}
}