import {
	Component, Input,
	OnInit, OnDestroy, OnChanges, SimpleChange
} from 'angular2/angular2';

@Component({
	selector: 'pb-viewport',
	templateUrl: 'app/components/viewport/Viewport.html'
})

export class Viewport implements OnInit, OnDestroy, OnChanges {
	@Input('pb-name') name: string;
	
	constructor() {
		console.log("This is a log generated with viewport...");
	 }

	onInit() { }
	
	onChanges(changes: {[key:string]:SimpleChange}) {
		
	 }
	
	onDestroy() { }
}