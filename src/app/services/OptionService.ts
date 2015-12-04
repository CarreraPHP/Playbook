import {Injectable} from 'angular2/angular2';
import { OptionInterface } from '../interfaces/OptionInterface';

@Injectable()
export class OptionService implements OptionInterface {

	constructor(public id:string, public name:string, public reference:string) {
		
	}

}