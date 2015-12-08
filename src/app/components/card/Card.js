var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var CardService_1 = require('../../services/CardService');
var Card = (function () {
    function Card(elRef) {
        this.elRef = elRef;
        this.BoundedRect = new angular2_1.EventEmitter();
    }
    Card.prototype.ngOnInit = function () {
        // console.log("within card item, ", this.item);
    };
    Card.prototype.ngOnChanges = function (changes) {
        console.log("data assigned : ", changes);
    };
    Card.prototype.ngAfterViewInit = function () {
        this.emitBoundedRect();
    };
    Card.prototype.ngAfterContentInit = function () {
        // console.log("Content Init : ", this.elRef.nativeElement, arguments);
        // this.emitBoundedRect();
    };
    Card.prototype.ngAfterViewChecked = function () {
        // this.emitBoundedRect();
    };
    Card.prototype.ngAfterContentChecked = function () {
        // this.emitBoundedRect();
    };
    Card.prototype.emitBoundedRect = function () {
        var el = this.elRef.nativeElement, elRect = el.getBoundingClientRect();
        // console.log("View Init : ", elRect.height, elRect.left, elRect.top);
        this.BoundedRect.emit({
            rect: {
                height: elRect.height,
                width: elRect.width,
                left: elRect.left,
                top: elRect.top
            },
            item: this.item,
            el: el
        });
    };
    Card.prototype.highlightRelation = function (cardCmp, enableAction) {
    };
    Card.prototype.OnHostClick = function (event) {
        // console.log("tiggered when click is made", arguments);
    };
    __decorate([
        angular2_1.Input('card-item'), 
        __metadata('design:type', CardService_1.CardService)
    ], Card.prototype, "item", void 0);
    __decorate([
        angular2_1.Output('rectAvailable'), 
        __metadata('design:type', angular2_1.EventEmitter)
    ], Card.prototype, "BoundedRect", void 0);
    __decorate([
        angular2_1.HostListener('click', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Card.prototype, "OnHostClick", null);
    Card = __decorate([
        angular2_1.Component({
            selector: 'pb-card',
            templateUrl: 'app/components/card/Card.html',
            directives: [angular2_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [angular2_1.ElementRef])
    ], Card);
    return Card;
})();
exports.Card = Card;
//# sourceMappingURL=Card.js.map