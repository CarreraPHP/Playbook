import { InternalInterface } from './InternalInterface';
import { OptionInterface } from './OptionInterface';
import { ActorInterface } from './ActorInterface';

export interface CardInterface {
	id:string;
	name: string;
	description: string;
	type: string;
	internal: InternalInterface;
	options: OptionInterface[];
	actors: ActorInterface[];
}