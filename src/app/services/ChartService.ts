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
		let item = new CardService("card" + this._cardCounter, "card " + this._cardCounter + " description", selCardType, internal, selCardType === 'End' ? [] : options, actors);
		return item;
	}
	
	getAll():CardInterface[] {
		return this.items;
	}
}