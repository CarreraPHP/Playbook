import {Injectable} from 'angular2/angular2';
import {CardInterface} from '../interfaces/CardInterface';

@Injectable()
export class CardService implements CardInterface {
	
	constructor(public name:string,	public description:string, public type: string, public internal: any, public options: any[], public actors: any[]) { 
		
	}

}