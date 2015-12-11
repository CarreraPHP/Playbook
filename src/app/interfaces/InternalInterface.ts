export interface InternalInterface {
	classes: Object;
	styles: string;
	left: number;
	top: number;
	linkLeft: string; //Used for relative reference, can be 'start' or any other existing card horizontally before it.
	linkTop: string; //Used for relative reference, can be 'start' or any other existing card vertically before it.
	height:number;
	width:number;
}