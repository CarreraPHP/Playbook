import {
    Component, Input, Output, EventEmitter, KeyValueDiffers,
    ElementRef, ChangeDetectorRef, ChangeDetectionStrategy,
    OnInit, AfterContentInit, DoCheck, AfterViewChecked, KeyValueDiffer, IterableDifferFactory
} from 'angular2/core';
import { ChartService } from '../../services/ChartService';
import { CardService } from '../../services/CardService';
import { OptionService } from '../../services/OptionService';
import { InternalService } from '../../services/InternalService';

@Component({
    selector: 'pb-arrow',
    templateUrl: 'app/components/arrow/Arrow.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class Arrow implements OnInit, DoCheck, AfterViewChecked, AfterContentInit {
    @Input('card-item') item: CardService;
    @Input('arrow-item') option: OptionService;
    @Input('card-internal') itemInternal: InternalService;
    @Output('arrowInitialised') boundedRect: EventEmitter<any> = new EventEmitter();
    private kvdiffer: KeyValueDiffer;
    private refKvdiffer: KeyValueDiffer;
    public referencedItem:CardService;
    
    constructor(
        private kvdiffers: KeyValueDiffers,
        private elRef: ElementRef, 
        private chartService:ChartService, 
        private changeDetector:ChangeDetectorRef) {
        // this.referencedItem = new CardService();
        this.kvdiffer = kvdiffers.find({}).create(null);
        this.refKvdiffer = kvdiffers.find({}).create(null);
     }
     
     ngOnInit() {
         this.emitBoundedRect('reference');
     }

    ngDoCheck() {
        var changes:IterableDifferFactory = this.kvdiffer.diff(this.item),
            refChanges:IterableDifferFactory = this.refKvdiffer.diff(this.referencedItem);
            
        if(changes){
            console.log("%c" + this.option.id + "arrow - see if this is triggered.", "color:gray", changes);
            // changes.supports()
            // changes.forEachAddedItem(r => console.log('added ' + r.item));
            // changes.forEachRemovedItem(r => console.log('removed ' + r.item));
            // debugger; 
            // this.emitBoundedRect('init');   
        }
        
        if(refChanges){
            console.log("%c" + this.option.id + "arrow - see if this is triggered.", "color:magenta", refChanges);
            // changes.supports()
            // changes.forEachAddedItem(r => console.log('added ' + r.item));
            // changes.forEachRemovedItem(r => console.log('removed ' + r.item));
            // debugger; 
            // this.emitBoundedRect('init');   
        }
    }
    
    ngAfterContentInit() { }
    
    ngAfterViewChecked() { 
        // console.log("Items in Arrow Class : ", this.item, this.option);
    }
    
	emitBoundedRect(type?:string) {
        console.log("%c" + type, "color:blue;font-size:42px;");
		if(type === "reference") {
            this.boundedRect.emit({
                event: 'reference',
                option: this.option,
                arrow: this
            }); 
            // return;   
        } else {
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
}