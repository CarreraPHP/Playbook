import { OptionInternalInterface } from './OptionInternalInterface';

export interface OptionInterface {
	id: string;
	name: string;
	reference: string;
    internal: OptionInternalInterface;
}