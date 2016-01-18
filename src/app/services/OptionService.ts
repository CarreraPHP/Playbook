import {Injectable} from 'angular2/core';
import { OptionInterface } from '../interfaces/OptionInterface';
import { OptionInternalInterface } from '../interfaces/OptionInternalInterface';

@Injectable()
export class OptionService implements OptionInterface {

	constructor(public id:string, public name:string, public reference:string, public internal:OptionInternalInterface) {
		
	}

}