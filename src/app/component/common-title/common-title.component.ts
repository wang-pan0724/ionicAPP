import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-common-title',
  templateUrl: './common-title.component.html',
  styleUrls: ['./common-title.component.css']
})
export class CommonTitleComponent implements OnInit {

  @Input() showReturn: boolean = false;
  @Input() selectDown: boolean = false;
  @Input() title: string;
  @Input() itemData:any;
  @Output() getTitleId = new EventEmitter();
 

  public showSelectItem: boolean = false;

  constructor(private router:Router) { }

  ngOnInit() {
  }

  goBack() {
    history.go(-1);
  }

  selectItem(){
    if(this.selectDown==true){
      this.showSelectItem = true;
    }
  }

  selectThis(el){
    this.showSelectItem = false;
    if(!!el){
      // this.title = this.title+this.itemData[el].title
      this.getTitleId.emit(el);
    }
    console.log(el)
  }

}
