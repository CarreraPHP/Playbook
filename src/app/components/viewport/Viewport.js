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
var Card_1 = require('../card/Card');
var ChartService_1 = require('../../services/ChartService');
var Viewport = (function () {
    function Viewport(chartService) {
        this.chartService = chartService;
        this._showAdmin = false;
        this._showView = true; // Display Preview
        // debugger;
        // chartService.add();
        this.items = chartService.getAll();
        // console.log("This is a log generated with viewport...", this.items);
    }
    Viewport.prototype.ngOnInit = function () {
        // console.log("viewport : initialised");
    };
    Viewport.prototype.ngOnChanges = function (changes) {
    };
    Viewport.prototype.ngOnDestroy = function () { };
    Object.defineProperty(Viewport.prototype, "isAdmin", {
        /**
         * used for determining whether to enable admin view or display view
         */
        set: function (value) {
            console.log("Admin value is ", value);
            this._showAdmin = value;
            this._showView = !value;
        },
        enumerable: true,
        configurable: true
    });
    Viewport.prototype.onCardBoundedRectAvailable = function ($event) {
        var refLeft = ($event.item.internal.left) + $event.rect.width + ChartService_1.ChartService.CARD_GAP;
        var refTop = ($event.item.internal.top) + $event.rect.height + ChartService_1.ChartService.CARD_GAP;
        // let refLeft = ($event.item.internal.left > $event.rect.left ? $event.item.internal.left : $event.rect.left) + $event.rect.width + Viewport.CARD_GAP;
        this.items.forEach(function (item, ik) {
            if ($event.item.id == item.internal.linkLeft) {
                item.internal.left = refLeft;
            }
            else if ("start" === item.internal.linkLeft) {
                item.internal.left = 0;
            }
            if ($event.item.id === item.internal.linkTop) {
                item.internal.top = refTop;
            }
            else if ("start" === item.internal.linkTop) {
                item.internal.top = 0;
            }
            // console.log("viewport listening", refLeft, refTop, item.id, item.internal);
        });
    };
    Viewport.prototype.onCardAction = function ($event) {
        console.log("card action", $event);
        if ($event.event === "add") {
            var rowStart = this.chartService.getRowStartCard($event.item), card = this.chartService.generateCard("", "card description", rowStart, this.chartService.getColumnStartCard($event.item, rowStart)), opt = this.chartService.generateOption(card.id); // , "option name"
            card.internal.left = this.chartService.getCord(card.internal, "left");
            card.internal.top = this.chartService.getCord(card.internal, "top");
            this.chartService.items.push(card);
            $event.item.options.push(opt);
        }
    };
    __decorate([
        angular2_1.Input('pb-name'), 
        __metadata('design:type', String)
    ], Viewport.prototype, "name", void 0);
    __decorate([
        angular2_1.Input('is-admin'), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], Viewport.prototype, "isAdmin", null);
    Viewport = __decorate([
        angular2_1.Component({
            selector: 'pb-viewport',
            templateUrl: 'app/components/viewport/Viewport.html',
            directives: [Card_1.Card, angular2_1.CORE_DIRECTIVES],
            providers: [ChartService_1.ChartService]
        }), 
        __metadata('design:paramtypes', [ChartService_1.ChartService])
    ], Viewport);
    return Viewport;
})();
exports.Viewport = Viewport;
//# sourceMappingURL=Viewport.js.map