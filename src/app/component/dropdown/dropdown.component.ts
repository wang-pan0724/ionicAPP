import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  @Output() selected = new EventEmitter();
  @Input() dataList:any;
  @Input() selectData:any;
  public showList:boolean = false;
  constructor() { }

  ngOnInit() {
  }

  selectThisItem(item){
    this.showList = false;
    this.selected.emit(item)
  }

  close(){
    this.showList = false;
  }

  selectItem(){
    this.showList = false;
    this.showList = true;
  }

}
