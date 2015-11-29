import {
	Component, 
	OnInit
} from 'angular2/angular2';
import {CardService} from '../../services/CardService';

@Component({
	selector: 'pb-card',
	templateUrl: 'app/components/card/Card.html'
})

export class Card implements OnInit {
	public item:CardService;
	
	constructor() {
		this.item = new CardService("card 1", "card 1 description", "Begin", {}, [], []);
	}

	onInit() { }
}