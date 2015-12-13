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
var ChartService_1 = require('../../services/ChartService');
var CardService_1 = require('../../services/CardService');
var Card = (function () {
    function Card(elRef, chartService) {
        this.elRef = elRef;
        this.chartService = chartService;
        this.boundedRect = new angular2_1.EventEmitter();
        this.cardRefresh = new angular2_1.EventEmitter();
        this.enableEditor = false; // flag for when to editor screen
    }
    Card.prototype.ngOnInit = function () {
        // console.log("within card item, ", this.item);
    };
    Card.prototype.ngOnChanges = function (changes) {
        console.log("data assigned : ", changes);
        this._internal = changes['item'].currentValue.internal;
    };
    Card.prototype.ngAfterViewInit = function () {
        console.log("View Init : ", this.elRef.nativeElement, arguments);
        this.emitBoundedRect();
    };
    Card.prototype.ngAfterContentInit = function () {
        // console.log("Content Init : ", this.elRef.nativeElement, arguments);
        // this.emitBoundedRect();
    };
    Card.prototype.ngAfterViewChecked = function () {
        // console.log(this.item.name, this.item.internal.left, this._internal.left);
        var el = this.elRef.nativeElement, elRect = el.getBoundingClientRect();
        if (this.item.internal.height !== elRect.height) {
            this.emitBoundedRect();
        }
    };
    Card.prototype.ngAfterContentChecked = function () {
        // this.emitBoundedRect();
    };
    Card.prototype.emitBoundedRect = function () {
        var el = this.elRef.nativeElement, elRect = el.getBoundingClientRect();
        // console.log("Emit Bounded Recr : ", elRect.height, elRect.left, elRect.top);
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
    };
    Card.prototype.emitCardRefresh = function (type, item) {
        this.cardRefresh.emit({
            event: type,
            item: item
        });
    };
    Object.defineProperty(Card.prototype, "editorWidth", {
        get: function () {
            return this.item.internal.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "editorHeight", {
        get: function () {
            return this.item.internal.height;
        },
        enumerable: true,
        configurable: true
    });
    Card.prototype.highlightRelation = function (cardCmp, enableAction) {
    };
    Card.prototype.addOption = function () {
        this.emitCardRefresh("add", this.item);
    };
    Card.prototype.OnHostClick = function (event) {
        // console.log("tiggered when click is made", arguments);
    };
    Card.prototype.OnHostOver = function (event) {
        this.enableEditor = true;
        // console.log("tiggered when mouse enters card", arguments);
    };
    Card.prototype.OnHostLeava = function (event) {
        this.enableEditor = false;
        // console.log("tiggered when mouse leaves card", arguments);
    };
    __decorate([
        angular2_1.Input('card-item'), 
        __metadata('design:type', CardService_1.CardService)
    ], Card.prototype, "item", void 0);
    __decorate([
        angular2_1.Input('show-edtior'), 
        __metadata('design:type', Boolean)
    ], Card.prototype, "showEditor", void 0);
    __decorate([
        // determines whether editor should be shown or not.
        angular2_1.Output('rectAvailable'), 
        __metadata('design:type', angular2_1.EventEmitter)
    ], Card.prototype, "boundedRect", void 0);
    __decorate([
        angular2_1.Output('cardAction'), 
        __metadata('design:type', angular2_1.EventEmitter)
    ], Card.prototype, "cardRefresh", void 0);
    __decorate([
        angular2_1.HostListener('click', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Card.prototype, "OnHostClick", null);
    __decorate([
        angular2_1.HostListener('mouseenter', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Card.prototype, "OnHostOver", null);
    __decorate([
        angular2_1.HostListener('mouseleave', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Card.prototype, "OnHostLeava", null);
    Card = __decorate([
        angular2_1.Component({
            selector: 'pb-card',
            templateUrl: 'app/components/card/Card.html',
            styles: ["\n\t\t.card-overlay{\n\t\t\tposition:absolute;\n\t\t\tbackground: rgba(0, 0, 0, 0.6);\n\t\t\theight:100%;\n\t\t\twidth:100%;\n\t\t}\n\t\t.card-button-list{\n\t\t\tpadding: 0 0 0 20px;\n\t\t}\n\t\t.card-button{\n\t\t\twidth:36px;\n\t\t\theight:36px;\n\t\t\tborder-radius:50%;\n\t\t\tbackground:rgba(255, 255, 255, 0.5);\n\t\t\tpadding:5px;\n\t\t\tmargin:5px;\n\t\t}\n\t\t.card-button:hover{\n\t\t\tbackground:rgba(255, 255, 255, 0.9);\n\t\t}\n\t\t.card-overlay button i {\n\t\t\tfont: normal normal normal 25px/25px FontAwesome;\n\t\t\tmargin:0;padding:0;\n\t\t}\n\t"],
            directives: [angular2_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [angular2_1.ElementRef, ChartService_1.ChartService])
    ], Card);
    return Card;
})();
exports.Card = Card;
//# sourceMappingURL=Card.js.map