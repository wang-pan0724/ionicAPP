import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-howtoplay-bassketball',
  templateUrl: './howtoplay-bassketball.component.html',
  styleUrls: ['./howtoplay-bassketball.component.css']
})
export class HowtoplayBassketballComponent implements OnInit {
  public title:string = '竞彩篮球球玩法介绍'
  constructor() { }

  ngOnInit() {
  }

}
