import { Injectable } from 'angular2/angular2';
import { ListWrapper } from 'angular2/src/facade/collection';
import { CardInterface } from '../interfaces/CardInterface';
import { InternalService } from './InternalService';
import { ActorService } from './ActorService';
import { OptionService } from './OptionService';
import { CardService } from './CardService';

interface LinkCard {
	linkDirection:string;
	linkReference:string;
}

@Injectable()
export class ChartService {
	static CARD_GAP = 100;
	public items:CardInterface[] = [];
	
	private _cardCounter = 0;
	private _optionCounter = 0;
	private _actorCounter = 0;
	
	constructor() {
		console.log("Chart Service got initialised");
		this.addMockData();
	}
	
	add(item?:CardInterface): any {
		this.items.push(item);
	}
	
	addMockData(): void {
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
	}
	
	generateInternal(linkLeft?:string, linkTop?:string): InternalService {
		let a = new InternalService({
			card: true
		}, "", 0, 0, linkLeft ? linkLeft : "start", linkTop ? linkTop : "start");
		return a;
	}
	
	generateCard(name?:string, description?:string, linkLeft?:string, linkTop?:string): CardService {
		let i = ++this._cardCounter,
			cid = "card" + i,
			a = new CardService(cid, name !== "" ? name : cid + " name", description ? description : cid + " description", "Activity", this.generateInternal(linkLeft ? linkLeft : "start", linkTop ? linkTop : "start"), [], []);
		return a;
	}
	
	generateOption(reference:string, name?:string): OptionService {
		let i = ++this._optionCounter,
			oid = "opt" + i,
			a = new OptionService(oid, name ? name : "Option " + i, reference);
		return a;
	}
	
	generateMockData(link?:LinkCard[]): CardService {
		let internal = new InternalService({
			card: true
		}, "", 0, 0, (this._cardCounter === 0 ? 'start' : 'card' + this._cardCounter), 'start');
		let options:OptionService[] = []; 
		let actors:ActorService[] = [];
		let cardType:string[] = ["Begin", "Activity", "Actor", "End"];
		
		this._cardCounter++;
		this._optionCounter++;
		this._actorCounter++;
		
		if(link) {
			ListWrapper.forEachWithIndex(link, function(l, k){
				if(l.linkDirection && l.linkDirection === "top") {
					internal.linkTop = l.linkReference;
				}
				if(l.linkDirection && l.linkDirection === "left") {
					internal.linkLeft = l.linkReference;
				}	
			});
		}
		
		options.push(new OptionService("opt" + this._optionCounter , "Option " + this._optionCounter, "card" + (this._optionCounter+1))); 
		actors.push(new ActorService("act" + this._actorCounter, "Actor " + this._actorCounter, "actor" + this._actorCounter + "@mail.com", "988498840" + this._actorCounter));
		this._actorCounter++;
		actors.push(new ActorService("act" + this._actorCounter, "Actor " + this._actorCounter, "actor" + this._actorCounter + "@mail.com", "988498840" + this._actorCounter));
		
		let selCardType:string = cardType[this._cardCounter-1];
		let item = new CardService("card" + this._cardCounter, "card" + this._cardCounter + " name", "card " + this._cardCounter + " description", selCardType, internal, selCardType === 'End' ? [] : options, actors);
		return item;
	}
	
	getAll():CardInterface[] {
		return this.items;
	}
	
	getCord(internal:InternalService, direction:string): number {
		let ret:number;
		this.items.forEach((item:CardService, index:number) => {
			if(direction === "left" && item.id === internal.linkLeft) {
				ret = (item.internal.left) + item.internal.width + ChartService.CARD_GAP;
		
			}
			if(direction === "top" && item.id === internal.linkTop) {
				ret = (item.internal.top) + item.internal.height + ChartService.CARD_GAP; 
			}
		});
		return ret;
	}
	
	getRowStartCard(item:CardService): string {
		let ret:string = "",
			toContinue:boolean = true,
			index = this.items.indexOf(item);
			
		if(item.internal.linkTop === "start") {
			ret = item.id;
		} else {
			let link:string = item.internal.linkTop;
			while (toContinue) {
				for(var i = 0; i < this.items.length; i++) {
					if(this.items[i].id === link){
						link = this.items[i].internal.linkTop;
						if(link === "start"){
							ret = this.items[i].id;
							toContinue = false;	
						}
					}	
				}
			}	
		}
		return ret;
	}
	
	//item is from previous column.
	getColumnStartCard(item:CardService, linkLeft:string): string {
		let ret:string = "start",
			toContinue:boolean = true,
			toContinueTillLast:boolean = true,
			// link:string = "start",
			possibleCard:CardService[] = [],
			limitStart = 0, limit = 20;
		
		// console.log("before we dive in : ",  linkLeft);
		
		for(var i = 0; i < this.items.length; i++) {
			if(this.items[i].internal.linkLeft === linkLeft) {
				possibleCard.push(this.items[i]);
			}
		}
		
		if(possibleCard.length > 0) {
			// console.log("possible card : ", possibleCard);
			while (possibleCard.length > 0 && limitStart < limit)  {
				for(var i = 0, j = possibleCard.length; i < possibleCard.length; i++) {
					if(possibleCard[i].internal.linkTop === ret) {
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
	}
	
	getStartCard(item:CardService, linkLeft:string): string {
		let ret:string = "",
			toContinue:boolean = true,
			toContinueTillLast:boolean = false,
			index = this.items.indexOf(item);
			
		// console.log("items", this.items);
		
		//find the start card in next column.
		for(var i = (index+1); i < this.items.length; i++) {			
			// if start card found, then find the last card in the next column
			// this step should be executed first in loop so that this will not
			// execute immediately after the code below to this one.
			if(!toContinue && toContinueTillLast && ret !== "" && this.items[i].internal.linkTop == "start"){
				// console.log("2nd loop", i);
				ret = this.items[i-1].id;
				toContinueTillLast = false;
			}
			
			if(this.items[i].internal.linkTop == "start" && toContinue){
				// console.log("1st loop", i);
				ret = this.items[i].id;
				toContinue = false;
				toContinueTillLast = true;
			}
			
			if(i === this.items.length-1 && toContinue && ret === "") {
				ret = "start";
			}
		}
		return ret;
	}
}