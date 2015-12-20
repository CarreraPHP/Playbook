import {Injectable} from 'angular2/core';
import { InternalInterface } from '../interfaces/InternalInterface';

@Injectable()
export class InternalService {

	constructor(public classes:Object, public styles:string, 
				public left:number, public top:number, 
				public linkLeft:string, public linkTop:string,
				public height?:number, public width?:number) {
		if(!("card" in this.classes)) {
			this.classes['card'] = true;
		}
		
		//height & width are used for reference purpose and not actually taken into consideration.
		if(!height){
			this.height = 0;
		}
		if(!width){
			this.width = 0;
		}
	}

}