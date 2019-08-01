import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-howtoplay-football',
  templateUrl: './howtoplay-football.component.html',
  styleUrls: ['./howtoplay-football.component.css']
})
export class HowtoplayFootballComponent implements OnInit {
  public title:string = "竞彩足球玩法介绍"
  constructor() { }

  ngOnInit() {
  }

}
