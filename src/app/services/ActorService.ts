import {Injectable} from 'angular2/angular2';
import { ActorInterface } from '../interfaces/ActorInterface';

@Injectable()
export class ActorService implements ActorInterface {

	constructor(public id:string, public name:string, public email:string, public contact:string) {
		
	}

}