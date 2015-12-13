import { Injectable } from 'angular2/angular2';
import { CardInterface } from '../interfaces/CardInterface';
import { OptionInterface } from '../interfaces/OptionInterface';
import { ActorInterface } from '../interfaces/ActorInterface';
import { InternalInterface } from '../interfaces/InternalInterface';

@Injectable()
export class CardService implements CardInterface {
	
	constructor(public id:string, public name:string,	public description:string, public type: string, public internal: InternalInterface, public options: OptionInterface[], public actors: ActorInterface[]) { 
		
	}

}