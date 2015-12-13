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
        this.items.push(this.generateMockData([{
                linkDirection: "top",
                linkReference: "start"
            }, {
                linkDirection: "left",
                linkReference: "card1"
            }]));
        this.items.push(this.generateMockData([{
                linkDirection: "top",
                linkReference: "card2"
            }, {
                linkDirection: "left",
                linkReference: "card1"
            }]));
        this.items.push(this.generateMockData([{
                linkDirection: "left",
                linkReference: "card2"
            }]));
        console.log("Chart Service add method called...", this.items);
    };
    ChartService.prototype.generateInternal = function (linkLeft, linkTop) {
        var a = new InternalService_1.InternalService({
            card: true
        }, "", 0, 0, linkLeft ? linkLeft : "start", linkTop ? linkTop : "start");
        return a;
    };
    ChartService.prototype.generateCard = function (name, description, linkLeft, linkTop) {
        var i = ++this._cardCounter, cid = "card" + i, a = new CardService_1.CardService(cid, name !== "" ? name : cid + " name", description ? description : cid + " description", "Activity", this.generateInternal(linkLeft ? linkLeft : "start", linkTop ? linkTop : "start"), [], []);
        return a;
    };
    ChartService.prototype.generateOption = function (reference, name) {
        var i = ++this._optionCounter, oid = "opt" + i, a = new OptionService_1.OptionService(oid, name ? name : "Option " + i, reference);
        return a;
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
        var item = new CardService_1.CardService("card" + this._cardCounter, "card" + this._cardCounter + " name", "card " + this._cardCounter + " description", selCardType, internal, selCardType === 'End' ? [] : options, actors);
        return item;
    };
    ChartService.prototype.getAll = function () {
        return this.items;
    };
    ChartService.prototype.getCord = function (internal, direction) {
        var ret;
        this.items.forEach(function (item, index) {
            if (direction === "left" && item.id === internal.linkLeft) {
                ret = (item.internal.left) + item.internal.width + ChartService.CARD_GAP;
            }
            if (direction === "top" && item.id === internal.linkTop) {
                ret = (item.internal.top) + item.internal.height + ChartService.CARD_GAP;
            }
        });
        return ret;
    };
    ChartService.prototype.getRowStartCard = function (item) {
        var ret = "", toContinue = true, index = this.items.indexOf(item);
        if (item.internal.linkTop === "start") {
            ret = item.id;
        }
        else {
            var link = item.internal.linkTop;
            while (toContinue) {
                for (var i = 0; i < this.items.length; i++) {
                    if (this.items[i].id === link) {
                        link = this.items[i].internal.linkTop;
                        if (link === "start") {
                            ret = this.items[i].id;
                            toContinue = false;
                        }
                    }
                }
            }
        }
        return ret;
    };
    //item is from previous column.
    ChartService.prototype.getColumnStartCard = function (item, linkLeft) {
        var ret = "start", toContinue = true, toContinueTillLast = true, 
        // link:string = "start",
        possibleCard = [], limitStart = 0, limit = 20;
        // console.log("before we dive in : ",  linkLeft);
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].internal.linkLeft === linkLeft) {
                possibleCard.push(this.items[i]);
            }
        }
        if (possibleCard.length > 0) {
            // console.log("possible card : ", possibleCard);
            while (possibleCard.length > 0 && limitStart < limit) {
                for (var i = 0, j = possibleCard.length; i < possibleCard.length; i++) {
                    if (possibleCard[i].internal.linkTop === ret) {
                        j = i;
                        ret = possibleCard[j].id;
                        i = possibleCard.length; // to exit out of the for loop
                    }
                }
                // console.log("i value after break : ", j, this.items[j].id, ret);
                possibleCard.splice(j, 1);
                limitStart++;
            }
        }
        return ret;
    };
    ChartService.prototype.getStartCard = function (item, linkLeft) {
        var ret = "", toContinue = true, toContinueTillLast = false, index = this.items.indexOf(item);
        // console.log("items", this.items);
        //find the start card in next column.
        for (var i = (index + 1); i < this.items.length; i++) {
            // if start card found, then find the last card in the next column
            // this step should be executed first in loop so that this will not
            // execute immediately after the code below to this one.
            if (!toContinue && toContinueTillLast && ret !== "" && this.items[i].internal.linkTop == "start") {
                // console.log("2nd loop", i);
                ret = this.items[i - 1].id;
                toContinueTillLast = false;
            }
            if (this.items[i].internal.linkTop == "start" && toContinue) {
                // console.log("1st loop", i);
                ret = this.items[i].id;
                toContinue = false;
                toContinueTillLast = true;
            }
            if (i === this.items.length - 1 && toContinue && ret === "") {
                ret = "start";
            }
        }
        return ret;
    };
    ChartService.CARD_GAP = 100;
    ChartService = __decorate([
        angular2_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ChartService);
    return ChartService;
})();
exports.ChartService = ChartService;
//# sourceMappingURL=ChartService.js.map