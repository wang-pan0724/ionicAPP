import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-match-endtime',
  templateUrl: './match-endtime.component.html',
  styleUrls: ['./match-endtime.component.css']
})
export class MatchEndtimeComponent implements OnInit {
  public id: number = 0;

  constructor() { }


  ngOnInit() {
  }

   // 查看详细数据
   goDetail(e){
    var that = this;
    // console.log(e.currentTarget.firstElementChild.className);
    if(e.currentTarget.firstElementChild.className == "icon ion-ios-arrow-down"){
      e.currentTarget.firstElementChild.className = "icon ion-ios-arrow-up"
      that.id = 1;
    }else{
      e.currentTarget.firstElementChild.className = "icon ion-ios-arrow-down"
      that.id = 0;
    }
  }

}
