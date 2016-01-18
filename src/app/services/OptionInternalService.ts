import {Injectable} from 'angular2/core';
import { OptionInternalInterface } from '../interfaces/OptionInternalInterface';

@Injectable()
export class OptionInternalService implements OptionInternalInterface {

	constructor(public classes:Object, public styles:string, 
				public left:number, public top:number, 
				public height?:number, public width?:number) {
		if(!("arrow" in this.classes)) {
			this.classes['arrow'] = true;
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