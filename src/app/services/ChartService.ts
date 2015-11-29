import {Injectable} from 'angular2/angular2';
import {CardInterface} from '../interfaces/CardInterface';

@Injectable()
export class ChartService {
	items:CardInterface[];
	
	constructor() { }
	
	add(item:CardInterface): void {
		this.items.push(item);
	}
}