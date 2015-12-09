import {Injectable} from 'angular2/angular2';
import { InternalInterface } from '../interfaces/InternalInterface';

@Injectable()
export class InternalService {

	constructor(public classes:Object, public styles:string, public left:number, public top:number) {
		if(!("card" in this.classes)) {
			this.classes['card'] = true;
		}
	}

}