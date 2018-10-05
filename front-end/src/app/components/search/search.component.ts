import { Component, OnInit, Output, Input,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  	constructor() { }

  
  	@Output() clicked = new EventEmitter<string>();
  	@Output() onblur = new EventEmitter();

  	ngOnInit() {
  	
  	}

  	onClick(searchTerm:string){
		this.clicked.emit(searchTerm);
	}


	getData(){
    	this.onblur.emit(true);
  	}
}
