import {Injectable} from 'angular2/angular2';
import {CardInterface} from '../interfaces/CardInterface';
import { InternalService } from './InternalService';
import { ActorService } from './ActorService';
import { OptionService } from './OptionService';
import { CardService } from './CardService';

@Injectable()
export class ChartService {
	public items:CardInterface[] = [];
	
	constructor() {
		console.log("Chart Service got initialised");
		this.addMockData();
	}
	
	add(item?:CardInterface): any {
		this.items.push(item);
	}
	
	addMockData(): void {
		let internal = new InternalService({
			card: true
		}, "");
		let options:OptionService[] = []; 
		let actors:ActorService[] = [];
		
		options.push(new OptionService("opt1", "Option 1", "card1")); 
		actors.push(new ActorService("act1", "Actor 1", "actor1@mail.com", "9884988401"));
		actors.push(new ActorService("act2", "Actor 2", "actor2@mail.com", "9884988402"));
		
		this.items.push(new CardService("card1", "card 1 description", "Begin", internal, options, actors)); 
		this.items.push(new CardService("card2", "card 2 description", "Actor", internal, options, actors));
		this.items.push(new CardService("card3", "card 3 description", "End", internal, options, actors));
		console.log("Chart Service add method called...", this.items);
	}
	
	getAll():CardInterface[] {
		return this.items;
	}
}