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
        // debugger;
        // chartService.add();
        this.items = chartService.getAll();
        console.log("This is a log generated with viewport...", this.items);
    }
    Viewport.prototype.ngOnInit = function () {
        console.log("viewport : initialised");
    };
    Viewport.prototype.ngOnChanges = function (changes) {
    };
    Viewport.prototype.ngOnDestroy = function () { };
    __decorate([
        angular2_1.Input('pb-name'), 
        __metadata('design:type', String)
    ], Viewport.prototype, "name", void 0);
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