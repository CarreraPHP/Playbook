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
var collection_1 = require('angular2/src/facade/collection');
var InternalService_1 = require('./InternalService');
var ActorService_1 = require('./ActorService');
var OptionService_1 = require('./OptionService');
var CardService_1 = require('./CardService');
var ChartService = (function () {
    function ChartService() {
        this.items = [];
        this._cardCounter = 0;
        this._optionCounter = 0;
        this._actorCounter = 0;
        console.log("Chart Service got initialised");
        this.addMockData();
    }
    ChartService.prototype.add = function (item) {
        this.items.push(item);
    };
    ChartService.prototype.addMockData = function () {
        this.items.push(this.generateMockData());
        this.items.push(this.generateMockData());
        this.items.push(this.generateMockData([{
                linkDirection: "top",
                linkReference: "card2"
            }, {
                linkDirection: "left",
                linkReference: "card1"
            }]));
        this.items.push(this.generateMockData());
        console.log("Chart Service add method called...", this.items);
    };
    ChartService.prototype.generateMockData = function (link) {
        var internal = new InternalService_1.InternalService({
            card: true
        }, "", 0, 0, (this._cardCounter === 0 ? 'start' : 'card' + this._cardCounter), 'start');
        var options = [];
        var actors = [];
        var cardType = ["Begin", "Activity", "Actor", "End"];
        this._cardCounter++;
        this._optionCounter++;
        this._actorCounter++;
        if (link) {
            collection_1.ListWrapper.forEachWithIndex(link, function (l, k) {
                if (l.linkDirection && l.linkDirection === "top") {
                    internal.linkTop = l.linkReference;
                }
                if (l.linkDirection && l.linkDirection === "left") {
                    internal.linkLeft = l.linkReference;
                }
            });
        }
        options.push(new OptionService_1.OptionService("opt" + this._optionCounter, "Option " + this._optionCounter, "card" + (this._optionCounter + 1)));
        actors.push(new ActorService_1.ActorService("act" + this._actorCounter, "Actor " + this._actorCounter, "actor" + this._actorCounter + "@mail.com", "988498840" + this._actorCounter));
        this._actorCounter++;
        actors.push(new ActorService_1.ActorService("act" + this._actorCounter, "Actor " + this._actorCounter, "actor" + this._actorCounter + "@mail.com", "988498840" + this._actorCounter));
        var selCardType = cardType[this._cardCounter - 1];
        var item = new CardService_1.CardService("card" + this._cardCounter, "card " + this._cardCounter + " description", selCardType, internal, selCardType === 'End' ? [] : options, actors);
        return item;
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