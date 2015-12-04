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
var InternalService_1 = require('./InternalService');
var ActorService_1 = require('./ActorService');
var OptionService_1 = require('./OptionService');
var CardService_1 = require('./CardService');
var ChartService = (function () {
    function ChartService() {
        this.items = [];
        console.log("Chart Service got initialised");
        this.addMockData();
    }
    ChartService.prototype.add = function (item) {
        this.items.push(item);
    };
    ChartService.prototype.addMockData = function () {
        var internal = new InternalService_1.InternalService({
            card: true
        }, "");
        var options = [];
        var actors = [];
        options.push(new OptionService_1.OptionService("opt1", "Option 1", "card1"));
        actors.push(new ActorService_1.ActorService("act1", "Actor 1", "actor1@mail.com", "9884988401"));
        actors.push(new ActorService_1.ActorService("act2", "Actor 2", "actor2@mail.com", "9884988402"));
        this.items.push(new CardService_1.CardService("card1", "card 1 description", "Begin", internal, options, actors));
        this.items.push(new CardService_1.CardService("card2", "card 2 description", "Actor", internal, options, actors));
        this.items.push(new CardService_1.CardService("card3", "card 3 description", "End", internal, options, actors));
        console.log("Chart Service add method called...", this.items);
    };
    ChartService.prototype.getAll = function () {
        return this.items;
    };
    ChartService = __decorate([
        angular2_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ChartService);
    return ChartService;
})();
exports.ChartService = ChartService;
//# sourceMappingURL=ChartService.js.map